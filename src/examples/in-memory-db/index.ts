import {
    createObserver,
    Listener,
    BeforeSetEvent,
    AfterSetEvent
} from "../../lib/patterns/observer";


interface Pokemon {
    id: string,
    attack: number,
    defense: number
}

interface BaseRecord {
    id: string
}

interface Database<T extends BaseRecord> {
    set(newValue: T): void;

    get(id: string): T | undefined;
}

/**
 * Factory Pattern.
 * Returns a new database instance.
 * > - db type is hardcoded for this example.
 * > - Generic type allow db's records type configuration.
 */
function createDatabase<T extends BaseRecord>() {

    class InMemoryDatabase implements Database<T> {
        private db: Record<string, T> = {};

        static instance: InMemoryDatabase = new InMemoryDatabase();

        private beforeAddListeners = createObserver<BeforeSetEvent<T>>();
        private afterAddListeners = createObserver<AfterSetEvent<T>>();

        private constructor() {
        }

        public set(newValue: T): void {
            this.beforeAddListeners.publish({
                newValue,
                value: this.db[newValue.id]!,
            });

            this.db[newValue.id] = newValue;

            this.afterAddListeners.publish({
                value: newValue,
            });
        }

        public get(id: string): T | undefined {
            return this.db[id];
        }

        onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void {
            return this.beforeAddListeners.subscribe(listener);
        }

        onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void {
            return this.afterAddListeners.subscribe(listener);
        }

        // Vistor
        visit(visitor: (item: T) => void): void {
            Object.values(this.db).forEach(visitor);
        }

        // Strategy
        selectBest(scoreStrategy: (item: T) => number): T | undefined {
            const found: {
                max: number;
                item: T | undefined;
            } = {
                max : 0,
                item: undefined,
            };

            Object.values(this.db).reduce((f, item) => {
                const score = scoreStrategy(item);
                if (score >= f.max) {
                    f.max = score;
                    f.item = item;
                }
                return f;
            }, found);

            return found.item;
        }
    }

    // Singleton pattern
    // const db = new InMemoryDatabase();
    // return db;
    return InMemoryDatabase.instance;
}

const db = createDatabase<Pokemon>();

db.set({
    id     : "Torito",
    attack : 100,
    defense: 30
})


db.set({
    id     : "Mask",
    attack : 10,
    defense: 500
})

console.clear();
console.log('\n')
console.log(db.get('Torito'));
console.log(db)