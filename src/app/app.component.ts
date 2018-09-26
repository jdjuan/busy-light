import { AppConfig } from '../environments/environment';
import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
  ) {
    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log(
        'Electron ipcRenderer',
        electronService.ipcRenderer,
      );
      console.log(
        'NodeJS childProcess',
        electronService.childProcess,
      );
    } else {
      console.log('Mode web');
    }
  }
}
