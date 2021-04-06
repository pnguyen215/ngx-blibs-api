

export class BlibsTUtils {
    /**
     * @param val Check for null Object
     */
    public static isObject(val) {
        if (val === null) {
            return false;
        }
        return ((typeof val === 'function') || (typeof val === 'object'));
    }

    /**
     * Parse JSON string
     */
    public static parseJSON(data) {
        data = data || '';
        return JSON.parse(data);
    }

    /**
     * Check empty object
     */
    public static checkEmptyObject(obj) {
        if (obj === undefined || obj === '' || obj === null) {
            return false;
        }
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Check if the string is empty or null
     */
    public static checkNotNullAndNotEmpty(data) {
        if (data !== null && data !== '' && data !== undefined) {
            return true;
        }
        return false;
    }

    /**
     * Check if the variable is undefined
     */
    public static isUndefined(data) {
        if (data === 'undefined' || data === undefined) {
            return true;
        }
        return false;
    }

    /**
     * Searches for a given substring
     */
    public static contains(str: string, substring: string, fromIndex: number) {
        return str.indexOf(substring, fromIndex) !== -1;
    }

    /**
     * "Safer" String.toLowerCase()
     */
    public static lowerCase(str) {
        return str.toLowerCase();
    }

    /**
     * "Safer" String.toUpperCase()
     */
    public static upperCase(str) {
        return str.toUpperCase();
    }

    /**
     * UPPERCASE first char of each word.
     */
    public static properCase(str) {
        return this.lowerCase(str).replace(/^\w|\s\w/g, this.upperCase);
    }

    /**
     * UPPERCASE first char of each sentence and lowercase other chars.
     */
    public static sentenceCase(str) {
        // Replace first char of each sentence (new line or after '.\s+') to
        return this.lowerCase(str).replace(/(^\w)|\.\s+(\w)/gm, this.upperCase);
    }
}
