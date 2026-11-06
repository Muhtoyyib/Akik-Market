import {PillTabs} from "@/components/pill-tabs/pill-tabs";
import {ProjectGrid} from "@/features/projects/project-grid";
import {useTabParam} from "@/components/pill-tabs/use-tab-param";
import {type Project, PROJECT_TYPES, type ProjectType} from "@/lib/content/projects";

type ProjectsFilterProps = {projects: readonly Project[]; types: readonly ProjectType[]};

/** Tabs for "All" and each type with projects, kept in ?type=; with one type there are no tabs (filters spec). */
export function ProjectsFilter({projects, types}: ProjectsFilterProps) {
  const {tab: type, select} = useTabParam("type", types, "all");
  if (types.length < 2) return <ProjectGrid projects={projects} level={2} />;
  const tabs = [
    {value: "all", label: "All", panel: <ProjectGrid projects={projects} level={2} />},
    ...types.map((key) => ({
      value: key,
      label: PROJECT_TYPES[key],
      panel: <ProjectGrid projects={projects.filter((project) => project.type === key)} level={2} />,
    })),
  ];
  return <PillTabs label="Projects by type" tabs={tabs} value={type} onValueChange={select} />;
}
