import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Image, List, Popup, PopupContent } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
import ProfileCard from "../../profiles/ProfileCard";

interface Props {
    attendees: Profile[];
}

export default observer(function ActivityListItemAttendee({ attendees }: Props) {

    const styles = {
        borderColor: 'orange',
        borderWidth: 3
    }
    return (
        <List horizontal>
            {attendees.map(e => (
                <Popup hoverable
                    key={e.username}
                    trigger={
                        <List.Item key={e.username} as={Link} to={`/profiles/${e.username}`}>
                            <Image bordered style={e.following ? styles : null} size="mini" circular src={e.image || "/assets/user.png"} />
                        </List.Item>
                    }
                >
                    <PopupContent>
                        <ProfileCard profile={e}/>
                    </PopupContent>
                </Popup>
            ))}
        </List>
    );
})