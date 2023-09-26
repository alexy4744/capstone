import {
    Container,
    Flex,
    Tabs,
    Tab,
    TabPanel,
    TabPanels,
    TabList,
    Heading
} from "@chakra-ui/react"
import HomeLayout from "../components/HomeLayout";
import ProgressBar from "../components/ProgressBar";

const HomePage = () => {

    return (
        <HomeLayout>
            <Flex h="500px" bg="#CBEFFF">
                <Container py="10" maxW="6xl" centerContent>
                    <ProgressBar initalDate={new Date("2022-10-22")} />
                </Container>
            </Flex>
            <Container maxW="6xl" py="10">
                <Heading>How do you want to study today?</Heading>
                <Tabs variant='soft-rounded' colorScheme="blue" pt="10">
                    <TabList justifyContent="space-around">
                        <Tab>Recommended</Tab>
                        <Tab>Pick Questions</Tab>
                        <Tab>Discussion</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <p>one!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>three!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>
        </HomeLayout>
    );
}

export default HomePage;