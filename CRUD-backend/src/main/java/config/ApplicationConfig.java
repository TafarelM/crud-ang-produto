
package config;

import java.util.Set;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

/**
 *
 * @author Tafar
 */
@ApplicationPath("/webresources")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(config.ConstrainViolationExceptionMapper.class);
        resources.add(config.CrossOriginFilter.class);
        resources.add(produtos.ProdutoService.class);
    }
    
}
