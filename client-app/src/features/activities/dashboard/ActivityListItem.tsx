import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Button, Icon, Item, ItemGroup, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
interface Props {
    activity: Activity
}

export default function ActivityListItem({activity} : Props) {
    return (
        <Segment.Group>
            <Segment>
                <ItemGroup>
                    <Item>
                        <Item.Image size="tiny" circular src='/assets/user.png'></Item.Image>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>Hosted by Vuong Nguyen</Item.Description>
                        </Item.Content>
                    </Item>
                </ItemGroup>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock'/> {format(activity.date!, 'dd MMM yyyy h: mm aa')}
                    <Icon name='marker'/> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button as={Link} to={`/activities/${activity.id}`} color='facebook' floated="right" content="View"/>
            </Segment>
        </Segment.Group>
    );
}
