export function toRecord<Keys extends string, Value>(
    featuresOptions: Keys[],
    toValue: (key: Keys) => Value,
): Record<Keys, Value>

export function toRecord<Keys extends string, InputValue, Value = InputValue>(
    featuresOptions: Record<Keys, InputValue>,
    mapValue?: (input: InputValue) => Value,
): Record<Keys, Value>

export function toRecord<Keys extends string, InputValue, Value>(
    featuresOptions: Keys[] | Record<Keys, InputValue>,
    mapValue?: (input: InputValue) => Value,
) {
    let features: Record<Keys, Value> = {} as any
    if (Array.isArray(featuresOptions)) {
        features = featuresOptions.reduce((acc, feature) => {
            ;(acc as any)[feature as any] = { enabled: true }
            return acc
        }, features)
    } else {
        Object.keys(featuresOptions).map((key) => {
            if (featuresOptions.hasOwnProperty(key)) {
                ;(features as any)[key] = mapValue
                    ? mapValue((featuresOptions as any)[key])
                    : (featuresOptions as any)[key]
            }
        })
    }
    return features
}
