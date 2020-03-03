// Angular
import { OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SimpleSubscription, I_SUBSCRIPTION } from './simple-subscription';

describe('@SimpleSubscription: Unit test', () => {
  @SimpleSubscription()
  class NewClassName implements I_SUBSCRIPTION {
    subscriptions: Subscription;
    ngOnDestroy(): void {}
    getLength(): number {
      const list = this.subscriptions;
      let count = 0;
      for (const x in list['_subscriptions']) {
        if (list['_subscriptions'].hasOwnProperty(x)) {
          count++;
        }
      }
      return count;
    }
  }

  let instance: NewClassName;

  beforeEach(() => {
    instance = new NewClassName();
    const obs = new Observable(() => {
      return {
        unsubscribe(): void {
        }
      };
    });

    instance.subscriptions.add(obs.subscribe());
    instance.subscriptions.add(obs.subscribe());
  });

  it('should create a new subscriptions', (): void => {
    expect(instance.getLength()).toBe(2);
  });

  it('should unsubscribe from existing subscriptions', (): void => {
    instance.ngOnDestroy();
    expect(instance.getLength()).toBe(0);
  });
});
