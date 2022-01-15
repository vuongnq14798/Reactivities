import { Message, MessageItem, MessageList } from "semantic-ui-react";

interface Props {
    errors: string[] | null;
}

export default function ValidationError({errors} : Props) {
    return (
        <Message error>
            {errors && (
                <MessageList>
                    {errors.map((e, i) => (
                        <MessageItem key={i}>{e}</MessageItem>
                    ))}
                </MessageList>
            )}
        </Message>
    ) 
}