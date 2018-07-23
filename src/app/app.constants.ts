import {Injectable} from '@angular/core';

@Injectable()
export class Configuration {
    public Server = '/';
    public ApiUrl = 'api/';
    public ServerWithApiUrl = this.Server + this.ApiUrl;
    public RetryCount = 3;
}
