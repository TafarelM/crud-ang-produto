var app = angular.module('produtosApp', ['ngRoute', 'ngResource']);

app.config(function ($routeProvider) {

    $routeProvider.when('/cadastro', {
        controller: 'CadastroProdutosController',
        templateUrl: 'templates/cadastro.html'
    }).when('/cadastro/:id', {
        controller: 'CadastroProdutosController',
        templateUrl: 'templates/cadastro.html'
    }).when('/tabela', {
        controller: 'TabelaProdutosController',
        templateUrl: 'templates/tabela.html'
    }).otherwise('/tabela');

});

app.controller('TabelaProdutosController', function ($scope, ProdutosService) {

    listar();

    function listar() {
        ProdutosService.listar().then(function (produtos) {
            $scope.produtos = produtos;
        });
    }

    $scope.excluir = function (produto) {
        ProdutosService.excluir(produto).then(listar);
    };
    
});

app.controller('CadastroProdutosController', function ($routeParams, $scope, $location, ProdutosService) {

    var id = $routeParams.id;
    
    if(id){
        ProdutosService.getProduto(id).then(function(produtos){
           $scope.produto = produtos; 
        });
    }else{
        $scope.produto = {};
    }
    
    function salvar(produto) {
        $scope.produto = {};
        return ProdutosService.salvar(produto).then(redirecionarTabela, function(erros){
            $scope.erros = erros.data;
        }); 
    };
    
    function redirecionarTabela() {
         $location.path('/tabela');
    }
    
    function erros(erros){
        $scope.erros = erros.data;
    }

    $scope.salvar = function (produto) {
        salvar(produto).then(redirecionarTabela, erros);            
    };
    
    $scope.salvarCadastrarNovo = function(produto) {
        salvar(produto).then(function(){
           $scope.frmCadastroProdutos.$setPristine();
        }, erros);
    };
    
    $scope.cancelar = redirecionarTabela;        

});

app.service('ProdutosService', function (ProdutosResource) {
    
    this.getProduto = function(id){
        return ProdutosResource.getProduto({id: id}).$promise;
    };

    this.listar = function () {
        return ProdutosResource.listar().$promise;
    };

    this.salvar = function (produto) {
        if (produto.id) {
            return ProdutosResource.update({id: produto.id}, produto).$promise;
        } else {
            return ProdutosResource.salvar(produto).$promise;
        }
    };

    this.excluir = function (produto) {
        return ProdutosResource.excluir({id: produto.id}).$promise;
    };

});

app.factory('ProdutosResource', function($resource){
    return $resource('http://localhost:8080/api/webresources/produtos/:id', {}, {
        update: {
            method: 'PUT'
        },        
        listar: {
            metrhod: 'GET',
            isArray: true
        },
        getProduto: {
            method: 'GET'
        },
        salvar: {
            method: 'POST'
        },
        excluir: {
            method: 'DELETE'
        }
    });
    
});

