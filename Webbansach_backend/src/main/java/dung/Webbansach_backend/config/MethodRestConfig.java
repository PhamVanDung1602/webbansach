package dung.Webbansach_backend.config;
//Configure to allow or block methods

import dung.Webbansach_backend.entity.BookGenre;
import dung.Webbansach_backend.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MethodRestConfig implements RepositoryRestConfigurer {
    @Autowired
    private EntityManager entityManager;
    private String url ="http://localhost:3000";

    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        //expose ids
        //allow id to appear when returning JSON
        config.exposeIdsFor(
                entityManager.getMetamodel().getEntities().stream()
                        .map(Type::getJavaType)
                        .toArray(Class[]::new)
        );
        //config.exposeIdsFor(BookGenre.class);

        //CORS Configuration
//        cors.addMapping("/**")
//                .allowedOrigins(url)
//                .allowedMethods("GET","POST","PUT","DELETE");

        //disable methods
//        HttpMethod[] disableMethods = {
//                HttpMethod.PUT,
//                HttpMethod.PATCH,
//                HttpMethod.DELETE,
//                HttpMethod.POST
//        };
////        disableHttpMethods(BookGenre.class, config, disableMethods);
////
////        //disable method DELETE
////        HttpMethod[] deleteMethod ={ HttpMethod.DELETE};
////        disableHttpMethods(User.class,config,deleteMethod);


    }
        // write a function to disable methods
        private void disableHttpMethods(Class c, RepositoryRestConfiguration config,
                                        HttpMethod[] methods ){
            config.getExposureConfiguration()
                    .forDomainType(c)
                    .withItemExposure((metdata,httpMethods) -> httpMethods.disable(methods))
                    .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(methods)));
        }
}

