sclrid: string;
    sclrname: string;
    amount: string;
    percentreeq: string;
    miniincome: string;
    gender: string;
    caste: string;
    educationqualifiation: string;
    deadline: string;
    application_link: string;
}



const dataToSend = {
        ...form,
        gender: form.gender || null,
        caste: form.caste || null,
        educationqualifiation:form.educationqualifiation || null
    };