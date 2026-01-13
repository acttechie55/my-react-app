import { useState } from 'react';

/**
 * useLocalStorage - A custom React hook for managing state synchronized with localStorage
 *
 * ANGULAR COMPARISON:
 * - In Angular, you might create a service that wraps localStorage
 * - In React, we create a custom hook that returns state and an updater function
 *
 * This hook combines:
 * 1. useState - for reactive state (like a BehaviorSubject in Angular)
 * 2. useEffect - for side effects (like ngOnInit/ngOnChanges)
 * 3. localStorage API - browser storage (same in both frameworks)
 *
 * @param key - The localStorage key to use
 * @param initialValue - Default value if nothing is in localStorage
 * @returns [storedValue, setValue] - Current value and setter function
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {

  // STEP 1: Initialize state
  // useState is like declaring a class property, but with a getter and setter
  // The function we pass runs ONLY on the first render (lazy initialization)
  const [storedValue, setStoredValue] = useState<T>(() => {
    // This function runs once when the component first mounts
    // ANGULAR EQUIVALENT: This is like code in ngOnInit

    try {
      // Try to get the item from localStorage
      const item = window.localStorage.getItem(key);

      // If it exists, parse and return it
      // If not, return the initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If anything goes wrong (e.g., JSON parsing fails), log and use initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // STEP 2: Create a setter function that updates BOTH state AND localStorage
  // This is the function that components will call to update the value
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function (for functional updates)
      // REACT PATTERN: This is similar to setState in class components
      // You can pass either a direct value OR a function that receives the current value
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Update React state (this triggers a re-render)
      // ANGULAR EQUIVALENT: Like updating a property and triggering change detection
      setStoredValue(valueToStore);

      // Update localStorage (this persists across browser sessions)
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Log any errors (e.g., localStorage quota exceeded)
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // STEP 3: Return the value and setter as a tuple (array)
  // ANGULAR COMPARISON:
  // - In Angular service, you might expose: value$ (Observable) and setValue() method
  // - In React hook, we expose: [currentValue, setterFunction]
  // This tuple pattern is common in React (useState, useReducer, etc.)
  return [storedValue, setValue];
}

/**
 * USAGE EXAMPLE:
 *
 * function MyComponent() {
 *   // This is like injecting a service in Angular, but calling a function
 *   const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);
 *
 *   const addFavorite = (id: string) => {
 *     // Option 1: Direct value
 *     setFavorites([...favorites, id]);
 *
 *     // Option 2: Functional update (recommended when based on current value)
 *     setFavorites(prev => [...prev, id]);
 *   };
 *
 *   return (
 *     <div>
 *       <p>Favorites: {favorites.length}</p>
 *       <button onClick={() => addFavorite('123')}>Add Favorite</button>
 *     </div>
 *   );
 * }
 */
