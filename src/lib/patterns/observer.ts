
// *
// * Observer Pattern
// *

export type Listener<EventType> = ((ev: EventType) => void);

/**
 * Create observer object for EventType
 */
export function createObserver<EventType>(): {

    subscribe: (listener: Listener<EventType>) => () => void;
    publish: (event: EventType) => void;
} {

    /**
     *  Array of listener functions
     */
    let listeners: Listener<EventType>[] = [];

    return {
        subscribe: (listener: Listener<EventType>) => {
            listeners.push(listener);
            return () => {
                listeners = listeners.filter((l) => l !== listener);
            };
        },
        publish  : (event: EventType) => {
            listeners.forEach((l) => l(event));
        }
    };
}

// @ts-ignore
export interface BeforeSetEvent<T> {
    value: T;
    newValue: T;
}

// @ts-ignore
export interface AfterSetEvent<T> {
    value: T;
}


// * example code
// let observer = createObserver<string>();
//
// let demoHdl  = (ev: string) => {
//     return;
// };
//
// let unsubscribe = observer.subscribe(demoHdl);
//
// // clean up stage..
// unsubscribe();