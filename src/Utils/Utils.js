class Utils {
    static decamelize(content, separator) {
        const sptr = typeof separator === 'undefined' ? ' ' : separator;
        let value = content.replace(/([a-z\d])([A-Z])/g, `$1${sptr}$2`);
        value = value.charAt(0).toUpperCase() + value.slice(1);
        return value;
    }
}
export default Utils;