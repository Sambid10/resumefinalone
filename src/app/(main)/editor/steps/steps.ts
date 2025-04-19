import { EditorFormProps } from "@/lib/types"
import GeneralnfoForm from "../forms/GeneralnfoForm"
import PersonalInfoForm from "../forms/PersonalInfoForm"
import WorkExperienceForm from "../forms/WorkExperienceForm"
import EducationForm from "../forms/EducationForm"
import SkillsForm from "../forms/SkillsForm"
import SummaryForm from "../forms/SummaryForm"
import ProjectForm from "../forms/ProjectForm"
import ReferenceForm from "../forms/ReferenceForm"
export const steps:{
    title:string,
    component:React.ComponentType<EditorFormProps>
    key:string
}[]=[{
    title:"General Info",
    component:GeneralnfoForm,
    key:"general-info"
},{
    title:"Personal Info",
    component:PersonalInfoForm,
    key:"personal-info"
},{
    title:"Work Experience",
    component:WorkExperienceForm,
    key:"work-experience"
},{
    title:"Education",
    component:EducationForm,
    key:"education"
},
{
    title:"Projects",
    component:ProjectForm,
    key:"project",
},
{
    title:"Skills",
    component:SkillsForm,
    key:"skills"
},
{
    title:"Reference",
    component:ReferenceForm,
    key:"reference"
},
{
    title:"Summary",
    component:SummaryForm,
    key:"summary"
}
]