import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';

/*
    This allows you to automatically unsubscribe your subscriptions
    to avoid memory leaks and bugs

    HOW TO USE:
    Your component needs to extend the class AutoUnsubscriber. Each time you make a Subscription
    you need to register it using the method "registerSubscription".
    The subscription will be unsubscribed when the component is destroyed.

    NOTES:
    You need to call super(); in the constructor of you component or else the code won't compile
    You may pass multiple subscriptions to the registerSubscription method.

    WARNING:
    If your component already has a ngOnDestroy method, you'll have to call super.ngOnDestroy()
    inside it.

    EXAMPLE:
    class MyAwesomeComponent extends AutoUnsubscriber {
        myAwesomeMethod() {
            this.registerSubscription(
                this.myAwesomeService.getSomeInfo().subscribe(infos => { ... }),
                this.myAwesomeService.getSomeOtherInfo().subscribe(infos => { ... })
            );
        }
    }
*/
@Component({
  template: ''
})
// tslint:disable-next-line:component-class-suffix
export abstract class AutoUnsubscriber implements OnDestroy {
    private rootSubscription = new Subscription();

    public registerSubscription(...subscriptions: Subscription[]) {
        subscriptions.forEach(subscription => this.rootSubscription.add(subscription));
    }

    ngOnDestroy() {
        this.rootSubscription.unsubscribe();
    }
}
