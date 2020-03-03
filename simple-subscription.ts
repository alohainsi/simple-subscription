// Angular
import { Subscription } from 'rxjs';

/**
 * Export SimpleSubscription
 */
export function SimpleSubscription(): Function {

  return (constructor: any): void => {
    const onInit = constructor.prototype.ngOnInit;
    const onDestroy = constructor.prototype.ngOnDestroy;

    if (typeof onDestroy === 'function') {
      const initSubscription = (): void => {
        constructor.prototype['subscriptions'] = new Subscription();
      };

      initSubscription();

      constructor.prototype.ngOnInit = function (): void {
        const isEmpty = (obj: any): boolean => {
          for (const x in obj) {
            if (obj.hasOwnProperty(x)) {
              return true;
            }
          }
          return false;
        };

        if (isEmpty(this.subscriptions['_subscriptions'])) {
          this.subscriptions = new Subscription();
        }

        if (onInit && typeof onInit === 'function') {
          onInit.apply(this, arguments);
        }
      };

      constructor.prototype.ngOnDestroy = function (): void {
        if (this.subscriptions) {
          this.subscriptions.unsubscribe();
        }

        if (onDestroy && typeof onDestroy === 'function') {
          onDestroy.apply(this, arguments);
        }

        initSubscription();
      };

      // Child class must have ngOnDestroy, even if empty
    } else {
      console.error('===========  ==========');

      // Throw error
      console.error(
        constructor.name +
        ' must have ngOnDestroy, even if empty (SimpleSubscription)'
      );

      console.error('===========  ==========');
    }
  };
}
