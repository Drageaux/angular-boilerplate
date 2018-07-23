import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthService} from '../../services/auth.service';
import {AuthGuard} from '../../services/auth.guard';

@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports: []
})
export class SharedModule {

    constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
        if (parentModule) {
            throw new Error('SharedModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AuthService,
                AuthGuard
            ]
        };
    }
}
