import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name="search" />
                <p>Oops - We've looked everywhere and could not find this.</p>
                <Segment.Inline >
                    <Button as={Link} to='/activities' primary>Return to Activities Page</Button>
                </Segment.Inline>
            </Header>
        </Segment>
    )
}
