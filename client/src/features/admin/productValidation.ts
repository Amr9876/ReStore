import * as yup from 'yup';

export const validationScheme = yup.object({
    name: yup.string().required(),
    price: yup.number().required().moreThan(100),
    description: yup.string().required(),
    brand: yup.string().required(),
    type: yup.string().required(),
    file: yup.mixed().when('pictureUrl', {
        is: (value: string) => !value,
        then: yup.mixed().required('Please provide an image') 
    }),
    quantityInStock: yup.number().required().min(0),
})
