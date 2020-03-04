## SUMMARY
This is a decorator which creates a new “subscription” instance. Its functionality will subscribe/unsubscribe from all existing subscriptions in a component by itself when OnDestroy is

## Usage

### 1. Import decorator || Interface
`import { SimpleSubscription, I_SUBSCRIPTION } from './simple-subscription';`

### 2. Initialize a decorator with others
```
@SimpleSubscription()
@OtherDecorator()
@Component({
 selector: 'app-component',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.scss']
})
```
### 3. Implement OnDestroy
```
export class ComponentClassName implements OnDestroy {
	ngOnDestroy(): void {
	}
}
```
##### ( even if empty ) it's an issue in AOT build (https://github.com/angular/angular/issues/16023)

### 4. Use it

```
export class ComponentClassName implements OnInit, I_SUBSCRIPTION {
    ngOnInit(): void {
        this.subscriptions.add(new Subscription());
    }
    ngOnDestroy(): void {
        // you don't have to control subscriptions anymore,
        // the decorator will unsubscribe from all of existing subscriptions by itself
    }
}
```
