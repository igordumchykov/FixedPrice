/**
 * property has name and value permanent per deployment
 * property is environment variable
 *
 * @param name name of environment variable to get
 * @throws Error if no such environment variable exist
 */
export function property(name: string): string {
    const value = process.env[name]

    if (!value) {
        const message = `required environment variable '${name}' is not defined`
        console.error(message)
        throw new Error(message)
    }

    return value
}