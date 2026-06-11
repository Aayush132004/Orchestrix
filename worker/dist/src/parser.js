export function parse(text, values) {
    if (!text)
        return "";
    return text.replace(/\{([^}]+)\}/g, (match, path) => {
        const keys = path.split('.');
        let current = typeof values === "string" ? JSON.parse(values) : values;
        for (const key of keys) {
            if (current && typeof current === "string") {
                try {
                    current = JSON.parse(current);
                }
                catch (e) { }
            }
            current = current?.[key];
        }
        return current !== undefined && current !== null ? String(current) : '';
    });
}
//# sourceMappingURL=parser.js.map