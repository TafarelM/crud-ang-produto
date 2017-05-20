package produtos;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Movimentacao.class)
public abstract class Movimentacao_ {

	public static volatile SingularAttribute<Movimentacao, TipoMovimentacao> tipo;
	public static volatile SingularAttribute<Movimentacao, Produto> produto;
	public static volatile SingularAttribute<Movimentacao, Integer> id;
	public static volatile SingularAttribute<Movimentacao, Date> dataHora;
	public static volatile SingularAttribute<Movimentacao, Double> quantidade;

}

