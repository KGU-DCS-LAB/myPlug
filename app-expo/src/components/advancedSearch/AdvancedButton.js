import { Button } from "native-base";

const AdvancedButton = ({ showList, modifyOption, findStations }) => {
    return (
        <>
            {
                showList ?
                    <Button onPress={() => modifyOption()}>테마 옵션 재설정</Button>
                    :
                    <Button onPress={() => findStations()}>검색</Button>
            }
        </>
    )
}

export default AdvancedButton;