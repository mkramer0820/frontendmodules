


export class UrlParameters {

    buyer: string;
    dueDateBefore?: string;
    dueDateAfter?: string;
    ordering?: string;
    buyerStyle?: string;
    jpStyle?:string;
    isActive?: boolean;
    page?: number;
    pageSize?: number;
    currentPage?: number;
    length?: number;
    djangoPageNumber: number;
   
    constructor(options: {
        
        ordering?: string;
        buyer?: string;
        dueDateBefore?: string;
        dueDateAfter?: string;
        buyerStyle?: string;
        jpStyle?:string;
        isActive?: boolean;
        page?: number;
        pageSize?: number;
        currentPage?: number;
        length?: number;
        djangoPageNumber? : number;
         } = {}) {
      this.ordering = options.ordering || 'id';
      this.buyer = options.buyer || '';
      this.dueDateBefore = options.dueDateBefore || '';
      this.dueDateAfter = options.dueDateAfter || '';
      this.buyerStyle = options.buyerStyle || '';
      this.jpStyle = options.jpStyle || '';
      this.isActive = options.isActive || true;
      this.page = options.page || 0;
      this.pageSize = options.pageSize || 5;
      this.currentPage = options.currentPage || 0;
      this.length = options.length || 100;
      this.djangoPageNumber = options.djangoPageNumber || 1;
      }
    
    updateToDjango(pageNum: number) {
        this.djangoPageNumber = pageNum;
    }
    
      
  }