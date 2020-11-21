import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';

const types = require('pg').types;
const PG_DATATYPE_INT8 = 20;

// Fix for parsing of bigint fields
// Reference: https://github.com/brianc/node-pg-types/issues/28
// types.setTypeParser(PG_DATATYPE_INT8, 'text', parseFloat);

export class BaseApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  public error_codes_map: {[key: string]: number} = {};

  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up default home page
    this.static('/', path.join(__dirname, '../../../public'));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
