import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

// Providers
import { Logger } from '../../../providers/logger/logger';
import { PopupProvider } from '../../../providers/popup/popup';

// Pages
import { BackupWarningPage } from '../../backup/backup-warning/backup-warning';
import { DisclaimerPage } from '../disclaimer/disclaimer';

@Component({
  selector: 'page-backup-request',
  templateUrl: 'backup-request.html'
})
export class BackupRequestPage {
  private walletId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private logger: Logger,
    private translate: TranslateService,
    private popupProvider: PopupProvider
  ) {
    this.walletId = this.navParams.get('walletId');
  }

  ionViewDidLoad() {
    this.logger.info('Loaded: BackupRequestPage');
  }

  public initBackupFlow(): void {
    this.navCtrl.push(BackupWarningPage, {
      walletId: this.walletId,
      fromOnboarding: true
    });
  }

  public doBackupLater(): void {
    let title = this.translate.instant('请注意!');
    let message = this.translate.instant(
      '如果该设备丢失或者您的GOVPUB应用被删除, 在您未备份的情况下我们将无法恢复您的资产.'
    );
    let okText = this.translate.instant('我确定不需要备份');
    let cancelText = this.translate.instant('返回');
    this.popupProvider
      .ionicConfirm(title, message, okText, cancelText)
      .then(res => {
        if (!res) return;
        let title = this.translate.instant('你确定要跳过此步骤?');
        let message = this.translate.instant(
          '你可以稍后在账户管理页面进行备份.'
        );
        let okText = this.translate.instant('是,请跳过');
        let cancelText = this.translate.instant('返回');
        this.popupProvider
          .ionicConfirm(title, message, okText, cancelText)
          .then(res => {
            if (!res) return;
            this.navCtrl.push(DisclaimerPage);
          });
      });
  }
}
