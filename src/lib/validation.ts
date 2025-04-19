import * as z from "zod"

const optionalString=z.string().trim().optional().or(z.literal(""))
export const generalinfoSchema=z.object({
    name:optionalString,
    description:optionalString
})
export type generalinfoValues=z.infer<typeof generalinfoSchema  >


export const personalinfoSchema=z.object({
    photo:z.custom<File | undefined>()
    .refine((file)=>!file || (file instanceof File && file.type.startsWith("image/")),"Must be an image file..")
    .refine((file)=>!file || file.size <= 1024*1024*4,"Image must be less than or equal to 4MB"),
    firstName:optionalString,
    lastName:optionalString,
    jobTitle:optionalString,
    city:optionalString,
    country:optionalString,
    phone:optionalString,
    email:optionalString,
    linkedinUrl:optionalString,
    websiteUrl:optionalString,
    githubUrl:optionalString,
})

export type personalinfoValues=z.infer<typeof personalinfoSchema>
export const workExperienceSchema=z.object({
    workExperiences:z.array(
        z.object({
            position:optionalString,
            company:optionalString,
            startDate:optionalString,
            endDate:optionalString,
            description:optionalString,
        })
    ).optional()
})

export type workExperienceValues=z.infer<typeof workExperienceSchema>
export const educationSchema=z.object({
    educations:z.array(z.object({
        universityName:optionalString,
        institutionName :optionalString,
        degreeName:optionalString,
        startDate:optionalString,
        endDate:optionalString,
        gpa:optionalString,
    })).optional()
})
export type educationValues=z.infer<typeof educationSchema>

export const projectSchema=z.object({
    projects:z.array(z.object({
        projectName:optionalString,
        startDate:optionalString,
        endDate:optionalString,
        projectDescription:optionalString,
        projectSubDescription :optionalString,
    })).optional()
})
export type projectValues=z.infer<typeof projectSchema>

export const skillsSchema=z.object({
    skills:z.array(z.string().trim()).optional()
})
export type skillValues=z.infer<typeof skillsSchema>
export const SummarySchema=z.object({
    summary:optionalString
})

export type summaryValues=z.infer<typeof SummarySchema>

export const referenceSchema=z.object({
    references:z.array(
        z.object({
            personName:optionalString,
            organizationName:optionalString,
            emailAddress:optionalString,
            location:optionalString,
            phoneNo:optionalString,
        })
    ).optional()
})
export type referenceValues=z.infer<typeof referenceSchema>


export const ResumeSchema=z.object({
    ...generalinfoSchema.shape,
    ...personalinfoSchema.shape,
    ...workExperienceSchema.shape,
    ...educationSchema.shape,
    ...skillsSchema.shape,
    ...SummarySchema.shape,
    ...projectSchema.shape,
    ...referenceSchema.shape,
    colorHex:optionalString,
    borderStyle:optionalString,
})

export type ResumeValues=Omit<z.infer<typeof ResumeSchema>,"photo"> & {
    id?:string
    photo?:File | string | null
}

