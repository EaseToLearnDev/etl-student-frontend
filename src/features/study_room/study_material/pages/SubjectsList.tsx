import ChildLayout from "../../../../layouts/child-layout/ChildLayout";
import SubjectCard from "../components/SubjectCard";

const dummyData = [
  {
    subjectName: "Chemistry",
    description:
      "Explore atoms, reactions, and everyday applications of chemical science",
    topicCount: 20,
    lastStudied: "Plant Physiology",
    url: "chemistry",
  },
  {
    subjectName: "Physics",
    description:
      "Dive into the laws of nature, motion, energy, and the universe",
    topicCount: 18,
    lastStudied: "Electromagnetic Induction",
    url: "physics",
  },
  {
    subjectName: "Mathematics",
    description:
      "Understand numbers, algebra, calculus, and geometry for problem-solving",
    topicCount: 25,
    lastStudied: "Differentiation",
    url: "mathematics",
  },
  {
    subjectName: "Biology",
    description: "Study life sciences, ecosystems, and cellular functions",
    topicCount: 22,
    lastStudied: "Genetics",
    url: "biology",
  },
  {
    subjectName: "Computer Science",
    description: "Learn programming, algorithms, and the basics of computing",
    topicCount: 15,
    lastStudied: "Data Structures",
    url: "computer_science",
  },
  {
    subjectName: "History",
    description:
      "Explore significant events, civilizations, and world transformations",
    topicCount: 12,
    lastStudied: "World War II",
    url: "history",
  },
  {
    subjectName: "Geography",
    description: "Study Earth's landscapes, environments, and global phenomena",
    topicCount: 14,
    lastStudied: "Plate Tectonics",
    url: "geography",
  },
  {
    subjectName: "Economics",
    description:
      "Understand production, distribution, and consumption of goods",
    topicCount: 10,
    lastStudied: "Demand and Supply",
    url: "economics",
  },
  {
    subjectName: "English",
    description: "Improve grammar, comprehension, and literary analysis skills",
    topicCount: 16,
    lastStudied: "Shakespeare's Sonnets",
    url: "english",
  },
  {
    subjectName: "Environmental Science",
    description:
      "Examine environmental issues, sustainability, and conservation",
    topicCount: 9,
    lastStudied: "Climate Change",
    url: "environmental-science",
  },
  {
    subjectName: "Political Science",
    description:
      "Analyze political systems, ideologies, and governance structures",
    topicCount: 11,
    lastStudied: "Indian Constitution",
    url: "political-science",
  },
];

const SubjectsList = () => {
  return (
    <div className="grid gap-5 h-full">
      <h3 className="!font-bold">Select Your Subject</h3>
      <div className="h-full overflow-y-auto">
      <ChildLayout
        primaryContent={
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] 2xl:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6 items-center">
            {dummyData?.map((item, index) => (
              <SubjectCard item={item} key={`${item?.subjectName}-${index}`} />
            ))}
          </div>
        }
        hideSecondary={true}
      />
      </div>
    </div>
  );
};

export default SubjectsList;
