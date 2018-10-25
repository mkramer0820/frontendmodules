angular.module('invoicing', [])

// The default logo for the invoice
.constant('DEFAULT_LOGO', 'src/assets/logo.png')

// The invoice displayed when the user first uses the app
.constant('DEFAULT_INVOICE', {
  tax: 0,
  invoice_number: 10,
  invoice_date: '',
  invoice_due_date: '',
  customer_info: {
    name: 'Stifel Nicolaus & Co Inc.',
    web_link: 'Emerging Markets',
    address1: '787 7th Avenue, 4th Floor',
    address2: 'New York, NY 10029',
    postal: ''
  },
  company_info: {
    name: 'KMK Kramer Enterprise LLC',
    web_link: 'Translation-Geek.io',
    address1: '55 W. End Ave, S15E',
    address2: 'New York, NY 10023',
    postal: ''
  },
  items:[
    {
      description: "Alianza Valores",
      qty: 23,
      cost: 15
    },
    {
      description: "Ar Partners",
      qty: 27,
      cost: 15
    },
    {
      description: "Alchemy Valores",
      qty: 30,
      cost: 15
    },
    {
      description: "Argenfunds",
      qty: 35,
      cost: 15
    },
    {
      description: "Axis",
      qty: 15,
      cost: 15
    },
    {
      description: "Balanz",
      qty: 36,
      cost: 15
    },
    {
      description: "Banque Heritage (Uruguay)",
      qty: 3,
      cost: 15
    },
    {
      description: "Banreservas",
      qty: 6,
      cost: 15
    },
    {
      description: "Cohen",
      qty: 44,
      cost: 15
    },
    {
      description: "Fidescriptionx",
      qty: 57,
      cost: 15
    },
    {
      description: "Global Agro Brokers SA",
      qty: 10,
      cost: 15
    },
    {
      description: "Pacifico Compania de Segu",
      qty: 4,
      cost: 15
    },
    {
      description: "Parallax",
      qty: 22,
      cost: 15
    },
    {
      description: "Pullier Uruguay",
      qty: 62,
      cost: 15
    },
    {
      description: "Sempione - ITALIAN",
      qty: 27,
      cost: 20
    },
    {
      description: "United Capital Puesto de B",
      qty: 39,
      cost: 15
    },
    {
      description: "Excel",
      qty: 29,
      cost: 15
    },
    {
      description: "Galicia Fondos",
      qty: 2,
      cost: 15
    },
    {
      description: "Mercantil Bank (Panama) S",
      qty: 1,
      cost: 15
    },
    {
      description: "Prima Valores",
      qty: 35,
      cost: 15
    }
   ]
})

// Service for accessing local storage
.service('LocalStorage', [function() {

    var Service = {};
  
    // Returns true if there is a logo stored
    var hasLogo = function() {
      return !!localStorage['logo'];
    };
  
    // Returns a stored logo (false if none is stored)
    Service.getLogo = function() {
      if (hasLogo()) {
        return localStorage['logo'];
      } else {
        return false;
      }
    };
  
    Service.setLogo = function(logo) {
      localStorage['logo'] = logo;
    };
  
    // Checks to see if an invoice is stored
    var hasInvoice = function() {
      return !(localStorage['invoice'] == '' || localStorage['invoice'] == null);
    };
  
    // Returns a stored invoice (false if none is stored)
    Service.getInvoice = function() {
      if (hasInvoice()) {
        return JSON.parse(localStorage['invoice']);
      } else {
        return false;
      }
    };
  
    Service.setInvoice = function(invoice) {
      localStorage['invoice'] = JSON.stringify(invoice);
    };
  
    // Clears a stored logo
    Service.clearLogo = function() {
      localStorage['logo'] = '';
    };
  
    // Clears a stored invoice
    Service.clearinvoice = function() {
      localStorage['invoice'] = '';
    };
  
    // Clears all local storage
    Service.clear = function() {
      localStorage['invoice'] = '';
      Service.clearLogo();
    };
  
    return Service;
  
  }])
  
  .service('Currency', [function(){
  
    var service = {};
  
    service.all = function() {
      return [
        {
          name: 'British Pound (£)',
          symbol: '£'
        },
        {
          name: 'Canadian Dollar ($)',
          symbol: 'CAD $ '
        },
        {
          name: 'Euro (€)',
          symbol: '€'
        },
        {
          name: 'Indian Rupee (₹)',
          symbol: '₹'
        },
        {
          name: 'Norwegian krone (kr)',
          symbol: 'kr '
        },
        {
          name: 'US Dollar ($)',
          symbol: '$'
        }
      ]
    }
  
    return service;
    
  }])
  
  // Main application controller
  .controller('InvoiceCtrl', ['$scope', '$http', 'DEFAULT_INVOICE', 'DEFAULT_LOGO', 'LocalStorage', 'Currency',
    function($scope, $http, DEFAULT_INVOICE, DEFAULT_LOGO, LocalStorage, Currency) {
  
    // Set defaults
    $scope.currencySymbol = '$';
    $scope.logoRemoved = false;
    $scope.printMode   = false;
  
    (function init() {
      // Attempt to load invoice from local storage
      !function() {
        var invoice = LocalStorage.getInvoice();
        $scope.invoice = invoice ? invoice : DEFAULT_INVOICE;
      }();
  
      // Set logo to the one from local storage or use default
      !function() {
        var logo = LocalStorage.getLogo();
        $scope.logo = logo ? logo : DEFAULT_LOGO;
      }();
  
      $scope.availableCurrencies = Currency.all();
  
    })()
    // Adds an item to the invoice's items
    $scope.addItem = function() {
      $scope.invoice.items.push({ qty:0, cost:0, description:"" });
    }
  
    // Toggle's the logo
    $scope.toggleLogo = function(element) {
      $scope.logoRemoved = !$scope.logoRemoved;
      LocalStorage.clearLogo();
    };
  
    // Triggers the logo chooser click event
    $scope.editLogo = function() {
      // angular.element('#imgInp').trigger('click');
      document.getElementById('imgInp').click();
    };
  
    $scope.printInfo = function() {
      window.print();
    };
  
    // Remotes an item from the invoice
    $scope.removeItem = function(item) {
      $scope.invoice.items.splice($scope.invoice.items.indexOf(item), 1);
    };
  
    // Calculates the sub total of the invoice
    $scope.invoiceSubTotal = function() {
      var total = 0.00;
      angular.forEach($scope.invoice.items, function(item, key){
        total += (item.qty * item.cost);
      });
      return total;
    };
  
    // Calculates the tax of the invoice
    $scope.calculateTax = function() {
      return (($scope.invoice.tax * $scope.invoiceSubTotal())/100);
    };
  
    // Calculates the grand total of the invoice
    $scope.calculateGrandTotal = function() {
      saveInvoice();
      return $scope.calculateTax() + $scope.invoiceSubTotal();
    };
  
    // Clears the local storage
    $scope.clearLocalStorage = function() {
      var confirmClear = confirm('Are you sure you would like to clear the invoice?');
      if(confirmClear) {
        LocalStorage.clear();
        setInvoice(DEFAULT_INVOICE);
      }
    };
  
    // Sets the current invoice to the given one
    var setInvoice = function(invoice) {
      $scope.invoice = invoice;
      saveInvoice();
    };
  
    // Reads a url
    var readUrl = function(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById('company_logo').setAttribute('src', e.target.result);
          LocalStorage.setLogo(e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
      }
    };
  
    // Saves the invoice in local storage
    var saveInvoice = function() {
      LocalStorage.setInvoice($scope.invoice);
    };
  
    // Runs on document.ready
    angular.element(document).ready(function () {
      // Set focus
      document.getElementById('invoice-number').focus();
  
      // Changes the logo whenever the input changes
      document.getElementById('imgInp').onchange = function() {
        readUrl(this);
      };
    });
  
  }])
  