export type Employee = {
    id: number;
    name: string;
    position: string;
    photo_url: string;
    description: string;
    link: string;
  };
  
  export type Review = {
    id: number;
    name: string;
    review: string;
    date: string;
    is_published: number;
  };
  
  export type EmployeeReviews = {
    show: boolean;
    reviews: Review[];
  };
  