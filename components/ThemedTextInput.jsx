import { TextInput } from 'react-native'

const ThemedTextInput = ({ style, ...props }) => {

    return (
        <TextInput
            style={[
                {
                    backgroundColor: "rgba(50, 50, 50, 1)",
                    color: "rgba(117, 117, 117, 1)",
                    padding: 20,
                    justifyContent: center,
                    fontSize: 16,
                    fontWeight: 500,
                    borderRadius: 16,
                    width: "95%"
                },
                style
            ]}
            {...props}
        />
    )
}
export default ThemedTextInput