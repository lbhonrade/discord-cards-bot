import {Booter} from '@loopback/boot';
import {
  Component,
  Constructor,
  ClassMap,
  ControllerClass,
  CoreBindings,
  inject,
  Provider,
  ProviderMap,
} from '@loopback/core';
import {Class, Repository} from '@loopback/repository';

import {BaseApplication} from './application';

// import {} from './booters';

// import {} from './controllers';

// import {} from './datasources';
// import {} from './helpers';

// import {} from './keys';

// import {} from './interceptors';

// import {} from './providers';

// import {} from './repositories';

// import {} from './services';

class CoreComponent implements Component {
  booters?: Constructor<Booter>[] = [];

  classes: ClassMap = {
  };

  controllers?: ControllerClass[] = [
  ];

  providers?: ProviderMap = {
  };

  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    private application: BaseApplication,
  ) {
    // application.dataSource(, 'sodb');
    [
    ].map((clazz: Class<Repository<any>>) => application.repository(clazz));
    [
      
    ].map((clazz: Class<Provider<any>>) =>
      application.service(clazz),
    );
    // Object.assign(this.application.error_codes_map, CoreError.CODES);
  }
}

export {CoreComponent};
