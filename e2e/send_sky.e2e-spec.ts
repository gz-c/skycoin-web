import { browser, by, element } from 'protractor';
import { SendSkyPage } from './send_sky.po';
import { WalletsPage } from './wallets.po';

describe('Send Sky', () => {
  let page: SendSkyPage;
  let walletPage: WalletsPage;

  beforeEach(() => {
    page = new SendSkyPage();
    walletPage = new WalletsPage();
  });

  it('should preconfigure wallet', () => {
    page.navigateTo().then(() => {
      browser.executeScript(
        `return window.localStorage.setItem(\'wallets\',
       JSON.stringify([{"label":"Test wallet","addresses":
       [{"address":"2moe8pXGU3zq8jmKS3Fv1vysJBW1nKXBr7R"}]}]) );
       `);
      walletPage.navigateTo().then(() => {
        walletPage.unlockFirstWallet().then((result) => {
          if (result) {
            const sendLink = element(by.css('[routerlink="/send"]'));
            return sendLink.click().then(() => {
              expect<any>(true).toBeTruthy();
            });
          }else {
            expect<any>(false).toBeTruthy();
          }
        });
      });
    });

  });
  it('should display title', () => {
    expect<any>(page.getHeaderText()).toEqual('Wallets');
  });

  it('should have wallets', () => {
    expect<any>(page.getWalletsCount()).toBeGreaterThan(0);
  });

  it('should have sky in wallets', () => {
    expect<any>(page.getWalletsWidthMoney().then((wallets) => {
      return wallets.length;
    })).toBeGreaterThan(0);
  });

  it('should have wallets enabled', () => {
    expect<any>(page.getValidsWallets().then((wallets) => {
      return wallets.length;
    })).toBeGreaterThan(0);
  });

  it('should select valid wallet', () => {
    expect<any>(page.selectValidWallet()).toBeTruthy();
  });

  it('should not enter wrong amount', () => {
    expect<any>(page.getValidWidthWrongAmount()).toBeFalsy();
  });

  it('should send  sky', () => {
    expect<any>(page.getCanSend()).toBeTruthy();
  });
});
