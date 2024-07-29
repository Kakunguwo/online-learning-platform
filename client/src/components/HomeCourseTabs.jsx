
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import CourseCard from "./CourseCard";

export default function HomeCourseTabs() {
  return (
    <div className="container flex w-full flex-col px-4 py-2">
      <Tabs aria-label="Options">
        <Tab key="photos" title="Latest">
          <Card>
            <CardBody>
              <CourseCard/>
              <CourseCard/>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="music" title="All">
          <Card>
            <CardBody>
              <CourseCard/>
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>
    </div>  
  );
}
