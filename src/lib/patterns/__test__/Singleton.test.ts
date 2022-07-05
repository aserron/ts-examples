import * as Jest from '@jest/core';
import {it,describe,test,expect,jest} from '@jest/globals';
import '@jest/types';
import {} from '@jest/test-sequencer';

import Singleton   from "../singleton";
import * as assert from "assert";


describe('Singleton pattern implementation', () => {
    test("Should be the same instance",(cb)=> {

        let a:Singleton;
        let b:Singleton;

        a = Singleton.getInstance();
        b = Singleton.getInstance();

        expect(b).toBe(a)
        expect(b).toBeInstanceOf(Singleton);

        cb!();
    })

})
