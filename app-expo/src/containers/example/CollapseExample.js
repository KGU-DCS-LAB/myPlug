import { View, Text } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';

const CollapseExample = () => {
    return (
        <View>
            <Collapse>
                <CollapseHeader>
                    <Text>날 눌러봐</Text>
                </CollapseHeader>
                <CollapseBody>
                    <Text>하이</Text>
                </CollapseBody>
            </Collapse>
            {/* <Collapse>
                <CollapseHeader>
                    <Separator bordered>
                        <Text>FORWARD</Text>
                    </Separator>
                </CollapseHeader>
                <CollapseBody>
                    <ListItem >
                        <Text>Aaron Bennet</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Claire Barclay</Text>
                    </ListItem>
                    <ListItem last>
                        <Text>Kelso Brittany</Text>
                    </ListItem>
                </CollapseBody>
            </Collapse> */}
        </View>
    )
}

export default CollapseExample;