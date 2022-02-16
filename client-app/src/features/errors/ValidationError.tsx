import { Message, MessageItem, MessageList } from "semantic-ui-react";

interface Props {
    errors: any;
}

export default function ValidationError({errors} : Props) {
    return (
        <Message error>
            {errors && (
                <MessageList>
                    {console.log(errors)}
                    {errors.map((e: any, i: any) => (
                        <MessageItem key={i}>{e}</MessageItem>
                    ))}
                </MessageList>
            )}
        </Message>
    ) 
}