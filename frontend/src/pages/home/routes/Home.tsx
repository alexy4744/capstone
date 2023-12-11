import { useEffect, useState } from "react";

import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";

import { motion } from "framer-motion";

import { BiSpaceBar } from "react-icons/bi";
import { PiPushPinDuotone } from "react-icons/pi";

import { Settings as SavedSettings, getSettings } from "../../../api/settings";

import { ProgressBar } from "../components/ProgressBar";
import PickQuestionsTab from "../components/PickQuestionsTab";
import { DifficultyStats } from "../components/DifficultyStats";
import { SuggestionCard } from "../components/SuggestionCard";

import { ExamDetails } from "../../settings/components/ExamDetails";

import { DefaultLayout } from "../../../layout/DefaultLayout";

const HomePage = () => {
  const [settings, setSettings] = useState<SavedSettings | null>(null);

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  return (
    <DefaultLayout>
      <Flex position="relative" h="450px">
        <motion.div
          style={{ display: "flex", position: "absolute", width: "100%", height: "370px" }}
          animate={{ height: "450px" }}
          transition={{ duration: 1.5, type: "spring" }}
        >
          <Flex position="relative" width="100%">
            <Flex bg="#CBEFFF" borderBottom="5px solid #F3F3F3" width="100%">
              <Container py="10" maxW="6xl" centerContent>
                <Flex position="relative" w="100%" alignItems="center">
                  <Heading py="2" position="absolute" top="-10px" style={{ rotate: "-10deg" }}>
                    SAT
                  </Heading>

                  <Flex w="100%" pt="18">
                    <Box w="80%" alignSelf={"center"}>
                      <ProgressBar testDate={settings?.examDate?.toDate()} />
                    </Box>

                    <Flex
                      bg="white"
                      position="relative"
                      justifyContent="center"
                      alignItems="center"
                      borderRadius="lg"
                      mx="3"
                      style={{ rotate: "10deg" }}
                    >
                      <Box position="absolute" top="-15px" right="-18px">
                        <PiPushPinDuotone size={40} color="#de7b7b" />
                      </Box>

                      <Box w="200px" py="2" minH="150px" textAlign="center">
                        <ExamDetails showLocation={false} examDate={settings?.examDate?.toDate()} />
                      </Box>
                    </Flex>
                  </Flex>
                </Flex>

                <DifficultyStats />
              </Container>
            </Flex>

            <Flex position="absolute" width="100%" bottom="-8vh" justifyContent="center">
              <BiSpaceBar size="100" color="#778287" />
            </Flex>
          </Flex>
        </motion.div>
      </Flex>

      <Container maxW="6xl" py="10">
        <Heading fontWeight="semibold" fontSize="2xl">
          How do you want to study today?
        </Heading>

        <Tabs pt="10">
          <TabList justifyContent="space-around">
            <Tab>Recommended</Tab>
            <Tab>Pick Questions</Tab>
            <Tab>Discussion</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <SimpleGrid minChildWidth="320px" spacing="40px">
                <SuggestionCard type="Difficulty" />
                <SuggestionCard type="Recommended" />
                <SuggestionCard type="Topic" />
              </SimpleGrid>
            </TabPanel>

            <TabPanel>
              <PickQuestionsTab />
            </TabPanel>

            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </DefaultLayout>
  );
};

export default HomePage;
