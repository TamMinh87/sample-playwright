import { allure } from 'allure-playwright';
import _ from 'lodash';
import { ContentType } from 'allure-js-commons';

export function stepWithName <T>(nameFn?: string | ((arg: T) => string)): (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
  return (target, propertyKey, descriptor) => {
    const original = descriptor.value;
    let callable: () => Promise<void>;
    if (typeof original === "function") {
      descriptor.value = function (...args: any[]) {
        try {
          const defaultStepName = [target?.constructor?.name, propertyKey]
            .filter((s) => s)
            .map((s) => _.chain(s).lowerCase().capitalize().value())
            .join(' > ');

          const value = typeof nameFn === "function" ? nameFn.apply(this, args) : nameFn || defaultStepName;
          callable = async () => allure.step(value, async () => {
            if(args.length){
              await allure.attachment('parameters', args.map((s, i) => `arg${i},${s}`).join('\n') , ContentType.CSV)
            }
            return original.apply(this, args)
          });

        }
        catch (e) {
          console.error(`[ERROR] Failed to apply step decorator: ${e}`);
        }
        return callable ? callable.apply(this) : original.apply(this, args);
      };
    }
    return descriptor;
  };
}

export const step = stepWithName();

export function decorateMethodsWithAllure(classType: { new(...args: any[]): any; }) {
  Object.getOwnPropertyNames(classType.prototype)
    .filter((s) => s !== 'constructor')
    .forEach((methodName) => {
      const prop = Reflect.get(classType.prototype, methodName);
      if (typeof prop === 'function' && prop.constructor.name === 'AsyncFunction') {
        const defaultStepName = [classType.name, methodName]
          .filter((s) => s)
          .map((s) => _.chain(s).lowerCase().capitalize().value())
          .join(' > ');

        Reflect.set(classType.prototype, methodName,
          new Proxy(prop, {
            apply(applyTarget, thisArg, args) {
              return allure.step(defaultStepName, async () => {
                if(args.length){
                  await allure.attachment('parameters', args.map((s, i) => `arg${i},${s}`).join('\n') , ContentType.CSV)
                }
                return Reflect.apply(applyTarget, thisArg, args);
              });
            }
          })
        )
      }
    });
}