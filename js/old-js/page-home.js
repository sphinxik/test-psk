
; /* Start:"a:4:{s:4:"full";s:103:"/local/templates/psk2024/components/bitrix/catalog.section/product-slide-card/script.js?168112496244798";s:6:"source";s:87:"/local/templates/psk2024/components/bitrix/catalog.section/product-slide-card/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
// (function (window) {
//
// if (!!window.JCCatalogSection)
// {
// 	return;
// }
//
// var BasketButton = function(params)
// {
// 	BasketButton.superclass.constructor.apply(this, arguments);
// 	this.nameNode = BX.create('span', {
// 		props : { className : 'bx_medium bx_bt_button', id : this.id },
// 		style: typeof(params.style) === 'object' ? params.style : {},
// 		text: params.text
// 	});
// 	this.buttonNode = BX.create('span', {
// 		attrs: { className: params.ownerClass },
// 		style: { marginBottom: '0', borderBottom: '0 none transparent' },
// 		children: [this.nameNode],
// 		events : this.contextEvents
// 	});
// 	if (BX.browser.IsIE())
// 	{
// 		this.buttonNode.setAttribute("hideFocus", "hidefocus");
// 	}
// };
// BX.extend(BasketButton, BX.PopupWindowButton);
//
// window.JCCatalogSection = function (arParams)
// {
// 	this.productType = 0;
// 	this.showQuantity = true;
// 	this.showAbsent = true;
// 	this.secondPict = false;
// 	this.showOldPrice = false;
// 	this.showPercent = false;
// 	this.showSkuProps = false;
// 	this.basketAction = 'ADD';
// 	this.showClosePopup = false;
// 	this.useCompare = false;
// 	this.visual = {
// 		ID: '',
// 		PICT_ID: '',
// 		SECOND_PICT_ID: '',
// 		QUANTITY_ID: '',
// 		QUANTITY_UP_ID: '',
// 		QUANTITY_DOWN_ID: '',
// 		PRICE_ID: '',
// 		DSC_PERC: '',
// 		SECOND_DSC_PERC: '',
// 		DISPLAY_PROP_DIV: '',
// 		BASKET_PROP_DIV: ''
// 	};
// 	this.product = {
// 		checkQuantity: false,
// 		maxQuantity: 0,
// 		stepQuantity: 1,
// 		isDblQuantity: false,
// 		canBuy: true,
// 		canSubscription: true,
// 		name: '',
// 		pict: {},
// 		id: 0,
// 		addUrl: '',
// 		buyUrl: ''
// 	};
//
// 	this.basketMode = '';
// 	this.basketData = {
// 		useProps: false,
// 		emptyProps: false,
// 		quantity: 'quantity',
// 		props: 'prop',
// 		basketUrl: '',
// 		sku_props: '',
// 		sku_props_var: 'basket_props',
// 		add_url: '',
// 		buy_url: ''
// 	};
//
// 	this.compareData = {
// 		compareUrl: '',
// 		comparePath: ''
// 	};
//
// 	this.defaultPict = {
// 		pict: null,
// 		secondPict: null
// 	};
//
// 	this.checkQuantity = false;
// 	this.maxQuantity = 0;
// 	this.stepQuantity = 1;
// 	this.isDblQuantity = false;
// 	this.canBuy = true;
// 	this.currentBasisPrice = {};
// 	this.canSubscription = true;
// 	this.precision = 6;
// 	this.precisionFactor = Math.pow(10,this.precision);
//
// 	this.offers = [];
// 	this.offerNum = 0;
// 	this.treeProps = [];
// 	this.obTreeRows = [];
// 	this.showCount = [];
// 	this.showStart = [];
// 	this.selectedValues = {};
//
// 	this.obProduct = null;
// 	this.obQuantity = null;
// 	this.obQuantityUp = null;
// 	this.obQuantityDown = null;
// 	this.obPict = null;
// 	this.obSecondPict = null;
// 	this.obPrice = null;
// 	this.obTree = null;
// 	this.obBuyBtn = null;
// 	this.obBasketActions = null;
// 	this.obNotAvail = null;
// 	this.obDscPerc = null;
// 	this.obSecondDscPerc = null;
// 	this.obSkuProps = null;
// 	this.obMeasure = null;
// 	this.obCompare = null;
//
// 	this.obPopupWin = null;
// 	this.basketUrl = '';
// 	this.basketParams = {};
//
// 	this.treeRowShowSize = 5;
// 	this.treeEnableArrow = { display: '', cursor: 'pointer', opacity: 1 };
// 	this.treeDisableArrow = { display: '', cursor: 'default', opacity:0.2 };
//
// 	this.lastElement = false;
// 	this.containerHeight = 0;
//
// 	this.errorCode = 0;
//
// 	if ('object' === typeof arParams)
// 	{
// 		this.productType = parseInt(arParams.PRODUCT_TYPE, 10);
// 		this.showQuantity = arParams.SHOW_QUANTITY;
// 		this.showAbsent = arParams.SHOW_ABSENT;
// 		this.secondPict = !!arParams.SECOND_PICT;
// 		this.showOldPrice = !!arParams.SHOW_OLD_PRICE;
// 		this.showPercent = !!arParams.SHOW_DISCOUNT_PERCENT;
// 		this.showSkuProps = !!arParams.SHOW_SKU_PROPS;
// 		if (!!arParams.ADD_TO_BASKET_ACTION)
// 		{
// 			this.basketAction = arParams.ADD_TO_BASKET_ACTION;
// 		}
// 		this.showClosePopup = !!arParams.SHOW_CLOSE_POPUP;
// 		this.useCompare = !!arParams.DISPLAY_COMPARE;
//
// 		this.visual = arParams.VISUAL;
//
// 		switch (this.productType)
// 		{
// 			case 0://no catalog
// 			case 1://product
// 			case 2://set
// 				if (!!arParams.PRODUCT && 'object' === typeof(arParams.PRODUCT))
// 				{
// 					if (this.showQuantity)
// 					{
// 						this.product.checkQuantity = arParams.PRODUCT.CHECK_QUANTITY;
// 						this.product.isDblQuantity = arParams.PRODUCT.QUANTITY_FLOAT;
// 						if (this.product.checkQuantity)
// 						{
// 							this.product.maxQuantity = (this.product.isDblQuantity ? parseFloat(arParams.PRODUCT.MAX_QUANTITY) : parseInt(arParams.PRODUCT.MAX_QUANTITY, 10));
// 						}
// 						this.product.stepQuantity = (this.product.isDblQuantity ? parseFloat(arParams.PRODUCT.STEP_QUANTITY) : parseInt(arParams.PRODUCT.STEP_QUANTITY, 10));
//
// 						this.checkQuantity = this.product.checkQuantity;
// 						this.isDblQuantity = this.product.isDblQuantity;
// 						this.maxQuantity = this.product.maxQuantity;
// 						this.stepQuantity = this.product.stepQuantity;
// 						if (this.isDblQuantity)
// 						{
// 							this.stepQuantity = Math.round(this.stepQuantity*this.precisionFactor)/this.precisionFactor;
// 						}
// 					}
// 					this.product.canBuy = arParams.PRODUCT.CAN_BUY;
// 					this.product.canSubscription = arParams.PRODUCT.SUBSCRIPTION;
// 					if (!!arParams.PRODUCT.BASIS_PRICE)
// 					{
// 						this.currentBasisPrice = arParams.PRODUCT.BASIS_PRICE;
// 					}
//
// 					this.canBuy = this.product.canBuy;
// 					this.canSubscription = this.product.canSubscription;
//
// 					this.product.name = arParams.PRODUCT.NAME;
// 					this.product.pict = arParams.PRODUCT.PICT;
// 					this.product.id = arParams.PRODUCT.ID;
// 					if (!!arParams.PRODUCT.ADD_URL)
// 					{
// 						this.product.addUrl = arParams.PRODUCT.ADD_URL;
// 					}
// 					if (!!arParams.PRODUCT.BUY_URL)
// 					{
// 						this.product.buyUrl = arParams.PRODUCT.BUY_URL;
// 					}
// 					if (!!arParams.BASKET && 'object' === typeof(arParams.BASKET))
// 					{
// 						this.basketData.useProps = !!arParams.BASKET.ADD_PROPS;
// 						this.basketData.emptyProps = !!arParams.BASKET.EMPTY_PROPS;
// 					}
// 				}
// 				else
// 				{
// 					this.errorCode = -1;
// 				}
// 				break;
// 			case 3://sku
// 				if (!!arParams.OFFERS && BX.type.isArray(arParams.OFFERS))
// 				{
// 					if (!!arParams.PRODUCT && 'object' === typeof(arParams.PRODUCT))
// 					{
// 						this.product.name = arParams.PRODUCT.NAME;
// 						this.product.id = arParams.PRODUCT.ID;
// 					}
// 					this.offers = arParams.OFFERS;
// 					this.offerNum = 0;
// 					if (!!arParams.OFFER_SELECTED)
// 					{
// 						this.offerNum = parseInt(arParams.OFFER_SELECTED, 10);
// 					}
// 					if (isNaN(this.offerNum))
// 					{
// 						this.offerNum = 0;
// 					}
// 					if (!!arParams.TREE_PROPS)
// 					{
// 						this.treeProps = arParams.TREE_PROPS;
// 					}
// 					if (!!arParams.DEFAULT_PICTURE)
// 					{
// 						this.defaultPict.pict = arParams.DEFAULT_PICTURE.PICTURE;
// 						this.defaultPict.secondPict = arParams.DEFAULT_PICTURE.PICTURE_SECOND;
// 					}
// 				}
// 				break;
// 			default:
// 				this.errorCode = -1;
// 		}
// 		if (!!arParams.BASKET && 'object' === typeof(arParams.BASKET))
// 		{
// 			if (!!arParams.BASKET.QUANTITY)
// 			{
// 				this.basketData.quantity = arParams.BASKET.QUANTITY;
// 			}
// 			if (!!arParams.BASKET.PROPS)
// 			{
// 				this.basketData.props = arParams.BASKET.PROPS;
// 			}
// 			if (!!arParams.BASKET.BASKET_URL)
// 			{
// 				this.basketData.basketUrl = arParams.BASKET.BASKET_URL;
// 			}
// 			if (3 === this.productType)
// 			{
// 				if (!!arParams.BASKET.SKU_PROPS)
// 				{
// 					this.basketData.sku_props = arParams.BASKET.SKU_PROPS;
// 				}
// 			}
// 			if (!!arParams.BASKET.ADD_URL_TEMPLATE)
// 			{
// 				this.basketData.add_url = arParams.BASKET.ADD_URL_TEMPLATE;
// 			}
// 			if (!!arParams.BASKET.BUY_URL_TEMPLATE)
// 			{
// 				this.basketData.buy_url = arParams.BASKET.BUY_URL_TEMPLATE;
// 			}
// 			if (this.basketData.add_url === '' && this.basketData.buy_url === '')
// 			{
// 				this.errorCode = -1024;
// 			}
// 		}
// 		if (this.useCompare)
// 		{
// 			if (!!arParams.COMPARE && typeof(arParams.COMPARE) === 'object')
// 			{
// 				if (!!arParams.COMPARE.COMPARE_PATH)
// 				{
// 					this.compareData.comparePath = arParams.COMPARE.COMPARE_PATH;
// 				}
// 				if (!!arParams.COMPARE.COMPARE_URL_TEMPLATE)
// 				{
// 					this.compareData.compareUrl = arParams.COMPARE.COMPARE_URL_TEMPLATE;
// 				}
// 				else
// 				{
// 					this.useCompare = false;
// 				}
// 			}
// 			else
// 			{
// 				this.useCompare = false;
// 			}
// 		}
//
// 		this.lastElement = (!!arParams.LAST_ELEMENT && 'Y' === arParams.LAST_ELEMENT);
// 	}
// 	if (0 === this.errorCode)
// 	{
// 		BX.ready(BX.delegate(this.Init,this));
// 	}
// };
//
// window.JCCatalogSection.prototype.Init = function()
// {
// 	var i = 0,
// 		strPrefix = '',
// 		TreeItems = null;
//
// 	this.obProduct = BX(this.visual.ID);
// 	if (!this.obProduct)
// 	{
// 		this.errorCode = -1;
// 	}
// 	this.obPict = BX(this.visual.PICT_ID);
// 	if (!this.obPict)
// 	{
// 		this.errorCode = -2;
// 	}
// 	if (this.secondPict && !!this.visual.SECOND_PICT_ID)
// 	{
// 		this.obSecondPict = BX(this.visual.SECOND_PICT_ID);
// 	}
// 	this.obPrice = BX(this.visual.PRICE_ID);
// 	if (!this.obPrice)
// 	{
// 		this.errorCode = -16;
// 	}
// 	if (this.showQuantity && !!this.visual.QUANTITY_ID)
// 	{
// 		this.obQuantity = BX(this.visual.QUANTITY_ID);
// 		if (!!this.visual.QUANTITY_UP_ID)
// 		{
// 			this.obQuantityUp = BX(this.visual.QUANTITY_UP_ID);
// 		}
// 		if (!!this.visual.QUANTITY_DOWN_ID)
// 		{
// 			this.obQuantityDown = BX(this.visual.QUANTITY_DOWN_ID);
// 		}
// 	}
// 	if (3 === this.productType && this.offers.length > 0)
// 	{
// 		if (!!this.visual.TREE_ID)
// 		{
// 			this.obTree = BX(this.visual.TREE_ID);
// 			if (!this.obTree)
// 			{
// 				this.errorCode = -256;
// 			}
// 			strPrefix = this.visual.TREE_ITEM_ID;
// 			for (i = 0; i < this.treeProps.length; i++)
// 			{
// 				this.obTreeRows[i] = {
// 					LEFT: BX(strPrefix+this.treeProps[i].ID+'_left'),
// 					RIGHT: BX(strPrefix+this.treeProps[i].ID+'_right'),
// 					LIST: BX(strPrefix+this.treeProps[i].ID+'_list'),
// 					CONT: BX(strPrefix+this.treeProps[i].ID+'_cont')
// 				};
// 				if (!this.obTreeRows[i].LEFT || !this.obTreeRows[i].RIGHT || !this.obTreeRows[i].LIST || !this.obTreeRows[i].CONT)
// 				{
// 					this.errorCode = -512;
// 					break;
// 				}
// 			}
// 		}
// 		if (!!this.visual.QUANTITY_MEASURE)
// 		{
// 			this.obMeasure = BX(this.visual.QUANTITY_MEASURE);
// 		}
// 	}
//
// 	this.obBasketActions = BX(this.visual.BASKET_ACTIONS_ID);
// 	if (!!this.obBasketActions)
// 	{
// 		if (!!this.visual.BUY_ID)
// 		{
// 			this.obBuyBtn = BX(this.visual.BUY_ID);
// 		}
// 	}
// 	this.obNotAvail = BX(this.visual.NOT_AVAILABLE_MESS);
//
// 	if (this.showPercent)
// 	{
// 		if (!!this.visual.DSC_PERC)
// 		{
// 			this.obDscPerc = BX(this.visual.DSC_PERC);
// 		}
// 		if (this.secondPict && !!this.visual.SECOND_DSC_PERC)
// 		{
// 			this.obSecondDscPerc = BX(this.visual.SECOND_DSC_PERC);
// 		}
// 	}
//
// 	if (this.showSkuProps)
// 	{
// 		if (!!this.visual.DISPLAY_PROP_DIV)
// 		{
// 			this.obSkuProps = BX(this.visual.DISPLAY_PROP_DIV);
// 		}
// 	}
//
// 	if (0 === this.errorCode)
// 	{
// 		if (this.showQuantity)
// 		{
// 			if (!!this.obQuantityUp)
// 			{
// 				BX.bind(this.obQuantityUp, 'click', BX.delegate(this.QuantityUp, this));
// 			}
// 			if (!!this.obQuantityDown)
// 			{
// 				BX.bind(this.obQuantityDown, 'click', BX.delegate(this.QuantityDown, this));
// 			}
// 			if (!!this.obQuantity)
// 			{
// 				BX.bind(this.obQuantity, 'change', BX.delegate(this.QuantityChange, this));
// 			}
// 		}
// 		switch (this.productType)
// 		{
// 			case 1://product
// 				break;
// 			case 3://sku
// 				if (this.offers.length > 0)
// 				{
// 					TreeItems = BX.findChildren(this.obTree, {tagName: 'li'}, true);
// 					if (!!TreeItems && 0 < TreeItems.length)
// 					{
// 						for (i = 0; i < TreeItems.length; i++)
// 						{
// 							BX.bind(TreeItems[i], 'click', BX.delegate(this.SelectOfferProp, this));
// 						}
// 					}
// 					for (i = 0; i < this.obTreeRows.length; i++)
// 					{
// 						BX.bind(this.obTreeRows[i].LEFT, 'click', BX.delegate(this.RowLeft, this));
// 						BX.bind(this.obTreeRows[i].RIGHT, 'click', BX.delegate(this.RowRight, this));
// 					}
// 					this.SetCurrent();
// 				}
// 				break;
// 		}
// 		if (!!this.obBuyBtn)
// 		{
// 			if (this.basketAction === 'ADD')
// 			{
// 				BX.bind(this.obBuyBtn, 'click', BX.delegate(this.Add2Basket, this));
// 			}
// 			else
// 			{
// 				BX.bind(this.obBuyBtn, 'click', BX.delegate(this.BuyBasket, this));
// 			}
// 		}
// 		if (this.lastElement)
// 		{
// 			this.containerHeight = parseInt(this.obProduct.parentNode.offsetHeight, 10);
// 			if (isNaN(this.containerHeight))
// 			{
// 				this.containerHeight = 0;
// 			}
// 			this.setHeight();
// 			BX.bind(window, 'resize', BX.delegate(this.checkHeight, this));
// 			BX.bind(this.obProduct.parentNode, 'mouseover', BX.delegate(this.setHeight, this));
// 			BX.bind(this.obProduct.parentNode, 'mouseout', BX.delegate(this.clearHeight, this));
// 		}
// 		if (this.useCompare)
// 		{
// 			this.obCompare = BX(this.visual.COMPARE_LINK_ID);
// 			if (!!this.obCompare)
// 			{
// 				BX.bind(this.obCompare, 'click', BX.proxy(this.Compare, this));
// 			}
// 		}
// 	}
// };
//
// window.JCCatalogSection.prototype.checkHeight = function()
// {
// 	this.containerHeight = parseInt(this.obProduct.parentNode.offsetHeight, 10);
// 	if (isNaN(this.containerHeight))
// 	{
// 		this.containerHeight = 0;
// 	}
// };
//
// window.JCCatalogSection.prototype.setHeight = function()
// {
// 	if (0 < this.containerHeight)
// 	{
// 		BX.adjust(this.obProduct.parentNode, {style: { height: this.containerHeight+'px'}});
// 	}
// };
//
// window.JCCatalogSection.prototype.clearHeight = function()
// {
// 	BX.adjust(this.obProduct.parentNode, {style: { height: 'auto'}});
// };
//
// window.JCCatalogSection.prototype.QuantityUp = function()
// {
// 	var curValue = 0,
// 		boolSet = true,
// 		calcPrice;
//
// 	if (0 === this.errorCode && this.showQuantity && this.canBuy)
// 	{
// 		curValue = (this.isDblQuantity ? parseFloat(this.obQuantity.value) : parseInt(this.obQuantity.value, 10));
// 		if (!isNaN(curValue))
// 		{
// 			curValue += this.stepQuantity;
// 			if (this.checkQuantity)
// 			{
// 				if (curValue > this.maxQuantity)
// 				{
// 					boolSet = false;
// 				}
// 			}
// 			if (boolSet)
// 			{
// 				if (this.isDblQuantity)
// 				{
// 					curValue = Math.round(curValue*this.precisionFactor)/this.precisionFactor;
// 				}
// 				this.obQuantity.value = curValue;
// 				calcPrice = {
// 					DISCOUNT_VALUE: this.currentBasisPrice.DISCOUNT_VALUE * curValue,
// 					VALUE: this.currentBasisPrice.VALUE * curValue,
// 					DISCOUNT_DIFF: this.currentBasisPrice.DISCOUNT_DIFF * curValue,
// 					DISCOUNT_DIFF_PERCENT: this.currentBasisPrice.DISCOUNT_DIFF_PERCENT,
// 					CURRENCY: this.currentBasisPrice.CURRENCY
// 				};
// 				this.setPrice(calcPrice);
// 			}
// 		}
// 	}
// };
//
// window.JCCatalogSection.prototype.QuantityDown = function()
// {
// 	var curValue = 0,
// 		boolSet = true,
// 		calcPrice;
//
// 	if (0 === this.errorCode && this.showQuantity && this.canBuy)
// 	{
// 		curValue = (this.isDblQuantity ? parseFloat(this.obQuantity.value): parseInt(this.obQuantity.value, 10));
// 		if (!isNaN(curValue))
// 		{
// 			curValue -= this.stepQuantity;
// 			if (curValue < this.stepQuantity)
// 			{
// 				boolSet = false;
// 			}
// 			if (boolSet)
// 			{
// 				if (this.isDblQuantity)
// 				{
// 					curValue = Math.round(curValue*this.precisionFactor)/this.precisionFactor;
// 				}
// 				this.obQuantity.value = curValue;
// 				calcPrice = {
// 					DISCOUNT_VALUE: this.currentBasisPrice.DISCOUNT_VALUE * curValue,
// 					VALUE: this.currentBasisPrice.VALUE * curValue,
// 					DISCOUNT_DIFF: this.currentBasisPrice.DISCOUNT_DIFF * curValue,
// 					DISCOUNT_DIFF_PERCENT: this.currentBasisPrice.DISCOUNT_DIFF_PERCENT,
// 					CURRENCY: this.currentBasisPrice.CURRENCY
// 				};
// 				this.setPrice(calcPrice);
// 			}
// 		}
// 	}
// };
//
// window.JCCatalogSection.prototype.QuantityChange = function()
// {
// 	var curValue = 0,
// 		calcPrice,
// 		intCount,
// 		count;
//
// 	if (0 === this.errorCode && this.showQuantity)
// 	{
// 		if (this.canBuy)
// 		{
// 			curValue = (this.isDblQuantity ? parseFloat(this.obQuantity.value) : parseInt(this.obQuantity.value, 10));
// 			if (!isNaN(curValue))
// 			{
// 				if (this.checkQuantity)
// 				{
// 					if (curValue > this.maxQuantity)
// 					{
// 						curValue = this.maxQuantity;
// 					}
// 				}
// 				if (curValue < this.stepQuantity)
// 				{
// 					curValue = this.stepQuantity;
// 				}
// 				else
// 				{
// 					count = Math.round((curValue*this.precisionFactor)/this.stepQuantity)/this.precisionFactor;
// 					intCount = parseInt(count, 10);
// 					if (isNaN(intCount))
// 					{
// 						intCount = 1;
// 						count = 1.1;
// 					}
// 					if (count > intCount)
// 					{
// 						curValue = (intCount <= 1 ? this.stepQuantity : intCount*this.stepQuantity);
// 						curValue = Math.round(curValue*this.precisionFactor)/this.precisionFactor;
// 					}
// 				}
// 				this.obQuantity.value = curValue;
// 			}
// 			else
// 			{
// 				this.obQuantity.value = this.stepQuantity;
// 			}
// 		}
// 		else
// 		{
// 			this.obQuantity.value = this.stepQuantity;
// 		}
// 		calcPrice = {
// 			DISCOUNT_VALUE: this.currentBasisPrice.DISCOUNT_VALUE * this.obQuantity.value,
// 			VALUE: this.currentBasisPrice.VALUE * this.obQuantity.value,
// 			DISCOUNT_DIFF: this.currentBasisPrice.DISCOUNT_DIFF * this.obQuantity.value,
// 			DISCOUNT_DIFF_PERCENT: this.currentBasisPrice.DISCOUNT_DIFF_PERCENT,
// 			CURRENCY: this.currentBasisPrice.CURRENCY
// 		};
// 		this.setPrice(calcPrice);
// 	}
// };
//
// window.JCCatalogSection.prototype.QuantitySet = function(index)
// {
// 	if (0 === this.errorCode)
// 	{
// 		this.canBuy = this.offers[index].CAN_BUY;
// 		if (this.canBuy)
// 		{
// 			if (!!this.obBasketActions)
// 			{
// 				BX.style(this.obBasketActions, 'display', '');
// 			}
// 			if (!!this.obNotAvail)
// 			{
// 				BX.style(this.obNotAvail, 'display', 'none');
// 			}
// 		}
// 		else
// 		{
// 			if (!!this.obBasketActions)
// 			{
// 				BX.style(this.obBasketActions, 'display', 'none');
// 			}
// 			if (!!this.obNotAvail)
// 			{
// 				BX.style(this.obNotAvail, 'display', '');
// 			}
// 		}
// 		if (this.showQuantity)
// 		{
// 			this.isDblQuantity = this.offers[index].QUANTITY_FLOAT;
// 			this.checkQuantity = this.offers[index].CHECK_QUANTITY;
// 			if (this.isDblQuantity)
// 			{
// 				this.maxQuantity = parseFloat(this.offers[index].MAX_QUANTITY);
// 				this.stepQuantity = Math.round(parseFloat(this.offers[index].STEP_QUANTITY)*this.precisionFactor)/this.precisionFactor;
// 			}
// 			else
// 			{
// 				this.maxQuantity = parseInt(this.offers[index].MAX_QUANTITY, 10);
// 				this.stepQuantity = parseInt(this.offers[index].STEP_QUANTITY, 10);
// 			}
//
// 			this.obQuantity.value = this.stepQuantity;
// 			this.obQuantity.disabled = !this.canBuy;
// 			if (!!this.obMeasure)
// 			{
// 				if (!!this.offers[index].MEASURE)
// 				{
// 					BX.adjust(this.obMeasure, { html : this.offers[index].MEASURE});
// 				}
// 				else
// 				{
// 					BX.adjust(this.obMeasure, { html : ''});
// 				}
// 			}
// 		}
// 		this.currentBasisPrice = this.offers[index].BASIS_PRICE;
// 	}
// };
//
// window.JCCatalogSection.prototype.SelectOfferProp = function()
// {
// 	var i = 0,
// 		value = '',
// 		strTreeValue = '',
// 		arTreeItem = [],
// 		RowItems = null,
// 		target = BX.proxy_context;
//
// 	if (!!target && target.hasAttribute('data-treevalue'))
// 	{
// 		strTreeValue = target.getAttribute('data-treevalue');
// 		arTreeItem = strTreeValue.split('_');
// 		if (this.SearchOfferPropIndex(arTreeItem[0], arTreeItem[1]))
// 		{
// 			RowItems = BX.findChildren(target.parentNode, {tagName: 'li'}, false);
// 			if (!!RowItems && 0 < RowItems.length)
// 			{
// 				for (i = 0; i < RowItems.length; i++)
// 				{
// 					value = RowItems[i].getAttribute('data-onevalue');
// 					if (value === arTreeItem[1])
// 					{
// 						BX.addClass(RowItems[i], 'bx_active');
// 					}
// 					else
// 					{
// 						BX.removeClass(RowItems[i], 'bx_active');
// 					}
// 				}
// 			}
// 		}
// 	}
// };
//
// window.JCCatalogSection.prototype.SearchOfferPropIndex = function(strPropID, strPropValue)
// {
// 	var strName = '',
// 		arShowValues = false,
// 		i, j,
// 		arCanBuyValues = [],
// 		allValues = [],
// 		index = -1,
// 		arFilter = {},
// 		tmpFilter = [];
//
// 	for (i = 0; i < this.treeProps.length; i++)
// 	{
// 		if (this.treeProps[i].ID === strPropID)
// 		{
// 			index = i;
// 			break;
// 		}
// 	}
//
// 	if (-1 < index)
// 	{
// 		for (i = 0; i < index; i++)
// 		{
// 			strName = 'PROP_'+this.treeProps[i].ID;
// 			arFilter[strName] = this.selectedValues[strName];
// 		}
// 		strName = 'PROP_'+this.treeProps[index].ID;
// 		arShowValues = this.GetRowValues(arFilter, strName);
// 		if (!arShowValues)
// 		{
// 			return false;
// 		}
// 		if (!BX.util.in_array(strPropValue, arShowValues))
// 		{
// 			return false;
// 		}
// 		arFilter[strName] = strPropValue;
// 		for (i = index+1; i < this.treeProps.length; i++)
// 		{
// 			strName = 'PROP_'+this.treeProps[i].ID;
// 			arShowValues = this.GetRowValues(arFilter, strName);
// 			if (!arShowValues)
// 			{
// 				return false;
// 			}
// 			allValues = [];
// 			if (this.showAbsent)
// 			{
// 				arCanBuyValues = [];
// 				tmpFilter = [];
// 				tmpFilter = BX.clone(arFilter, true);
// 				for (j = 0; j < arShowValues.length; j++)
// 				{
// 					tmpFilter[strName] = arShowValues[j];
// 					allValues[allValues.length] = arShowValues[j];
// 					if (this.GetCanBuy(tmpFilter))
// 						arCanBuyValues[arCanBuyValues.length] = arShowValues[j];
// 				}
// 			}
// 			else
// 			{
// 				arCanBuyValues = arShowValues;
// 			}
// 			if (!!this.selectedValues[strName] && BX.util.in_array(this.selectedValues[strName], arCanBuyValues))
// 			{
// 				arFilter[strName] = this.selectedValues[strName];
// 			}
// 			else
// 			{
// 				if (this.showAbsent)
// 					arFilter[strName] = (arCanBuyValues.length > 0 ? arCanBuyValues[0] : allValues[0]);
// 				else
// 					arFilter[strName] = arCanBuyValues[0];
// 			}
// 			this.UpdateRow(i, arFilter[strName], arShowValues, arCanBuyValues);
// 		}
// 		this.selectedValues = arFilter;
// 		this.ChangeInfo();
// 	}
// 	return true;
// };
//
// window.JCCatalogSection.prototype.RowLeft = function()
// {
// 	var i = 0,
// 		strTreeValue = '',
// 		index = -1,
// 		target = BX.proxy_context;
//
// 	if (!!target && target.hasAttribute('data-treevalue'))
// 	{
// 		strTreeValue = target.getAttribute('data-treevalue');
// 		for (i = 0; i < this.treeProps.length; i++)
// 		{
// 			if (this.treeProps[i].ID === strTreeValue)
// 			{
// 				index = i;
// 				break;
// 			}
// 		}
// 		if (-1 < index && this.treeRowShowSize < this.showCount[index])
// 		{
// 			if (0 > this.showStart[index])
// 			{
// 				this.showStart[index]++;
// 				BX.adjust(this.obTreeRows[index].LIST, { style: { marginLeft: this.showStart[index]*20+'%' }});
// 				BX.adjust(this.obTreeRows[index].RIGHT, { style: this.treeEnableArrow });
// 			}
//
// 			if (0 <= this.showStart[index])
// 			{
// 				BX.adjust(this.obTreeRows[index].LEFT, { style: this.treeDisableArrow });
// 			}
// 		}
// 	}
// };
//
// window.JCCatalogSection.prototype.RowRight = function()
// {
// 	var i = 0,
// 		strTreeValue = '',
// 		index = -1,
// 		target = BX.proxy_context;
//
// 	if (!!target && target.hasAttribute('data-treevalue'))
// 	{
// 		strTreeValue = target.getAttribute('data-treevalue');
// 		for (i = 0; i < this.treeProps.length; i++)
// 		{
// 			if (this.treeProps[i].ID === strTreeValue)
// 			{
// 				index = i;
// 				break;
// 			}
// 		}
// 		if (-1 < index && this.treeRowShowSize < this.showCount[index])
// 		{
// 			if ((this.treeRowShowSize - this.showStart[index]) < this.showCount[index])
// 			{
// 				this.showStart[index]--;
// 				BX.adjust(this.obTreeRows[index].LIST, { style: { marginLeft: this.showStart[index]*20+'%' }});
// 				BX.adjust(this.obTreeRows[index].LEFT, { style: this.treeEnableArrow });
// 			}
//
// 			if ((this.treeRowShowSize - this.showStart[index]) >= this.showCount[index])
// 			{
// 				BX.adjust(this.obTreeRows[index].RIGHT, { style: this.treeDisableArrow });
// 			}
// 		}
// 	}
// };
//
// window.JCCatalogSection.prototype.UpdateRow = function(intNumber, activeID, showID, canBuyID)
// {
// 	var i = 0,
// 		showI = 0,
// 		value = '',
// 		countShow = 0,
// 		strNewLen = '',
// 		obData = {},
// 		pictMode = false,
// 		extShowMode = false,
// 		isCurrent = false,
// 		selectIndex = 0,
// 		obLeft = this.treeEnableArrow,
// 		obRight = this.treeEnableArrow,
// 		currentShowStart = 0,
// 		RowItems = null;
//
// 	if (-1 < intNumber && intNumber < this.obTreeRows.length)
// 	{
// 		RowItems = BX.findChildren(this.obTreeRows[intNumber].LIST, {tagName: 'li'}, false);
// 		if (!!RowItems && 0 < RowItems.length)
// 		{
// 			pictMode = ('PICT' === this.treeProps[intNumber].SHOW_MODE);
// 			countShow = showID.length;
// 			extShowMode = this.treeRowShowSize < countShow;
// 			strNewLen = (extShowMode ? (100/countShow)+'%' : '20%');
// 			obData = {
// 				props: { className: '' },
// 				style: {
// 					width: strNewLen
// 				}
// 			};
// 			if (pictMode)
// 			{
// 				obData.style.paddingTop = strNewLen;
// 			}
// 			for (i = 0; i < RowItems.length; i++)
// 			{
// 				value = RowItems[i].getAttribute('data-onevalue');
// 				isCurrent = (value === activeID);
// 				if (BX.util.in_array(value, canBuyID))
// 				{
// 					obData.props.className = (isCurrent ? 'bx_active' : '');
// 				}
// 				else
// 				{
// 					obData.props.className = (isCurrent ? 'bx_active bx_missing' : 'bx_missing');
// 				}
// 				obData.style.display = 'none';
// 				if (BX.util.in_array(value, showID))
// 				{
// 					obData.style.display = '';
// 					if (isCurrent)
// 					{
// 						selectIndex = showI;
// 					}
// 					showI++;
// 				}
// 				BX.adjust(RowItems[i], obData);
// 			}
//
// 			obData = {
// 				style: {
// 					width: (extShowMode ? 20*countShow : 100)+'%',
// 					marginLeft: '0%'
// 				}
// 			};
// 			if (pictMode)
// 			{
// 				BX.adjust(this.obTreeRows[intNumber].CONT, {props: {className: (extShowMode ? 'bx_item_detail_scu full' : 'bx_item_detail_scu')}});
// 			}
// 			else
// 			{
// 				BX.adjust(this.obTreeRows[intNumber].CONT, {props: {className: (extShowMode ? 'bx_item_detail_size full' : 'bx_item_detail_size')}});
// 			}
// 			if (extShowMode)
// 			{
// 				if (selectIndex +1 === countShow)
// 				{
// 					obRight = this.treeDisableArrow;
// 				}
// 				if (this.treeRowShowSize <= selectIndex)
// 				{
// 					currentShowStart = this.treeRowShowSize - selectIndex - 1;
// 					obData.style.marginLeft = currentShowStart*20+'%';
// 				}
// 				if (0 === currentShowStart)
// 				{
// 					obLeft = this.treeDisableArrow;
// 				}
// 				BX.adjust(this.obTreeRows[intNumber].LEFT, {style: obLeft });
// 				BX.adjust(this.obTreeRows[intNumber].RIGHT, {style: obRight });
// 			}
// 			else
// 			{
// 				BX.adjust(this.obTreeRows[intNumber].LEFT, {style: {display: 'none'}});
// 				BX.adjust(this.obTreeRows[intNumber].RIGHT, {style: {display: 'none'}});
// 			}
// 			BX.adjust(this.obTreeRows[intNumber].LIST, obData);
// 			this.showCount[intNumber] = countShow;
// 			this.showStart[intNumber] = currentShowStart;
// 		}
// 	}
// };
//
// window.JCCatalogSection.prototype.GetRowValues = function(arFilter, index)
// {
// 	var i = 0,
// 		j,
// 		arValues = [],
// 		boolSearch = false,
// 		boolOneSearch = true;
//
// 	if (0 === arFilter.length)
// 	{
// 		for (i = 0; i < this.offers.length; i++)
// 		{
// 			if (!BX.util.in_array(this.offers[i].TREE[index], arValues))
// 			{
// 				arValues[arValues.length] = this.offers[i].TREE[index];
// 			}
// 		}
// 		boolSearch = true;
// 	}
// 	else
// 	{
// 		for (i = 0; i < this.offers.length; i++)
// 		{
// 			boolOneSearch = true;
// 			for (j in arFilter)
// 			{
// 				if (arFilter[j] !== this.offers[i].TREE[j])
// 				{
// 					boolOneSearch = false;
// 					break;
// 				}
// 			}
// 			if (boolOneSearch)
// 			{
// 				if (!BX.util.in_array(this.offers[i].TREE[index], arValues))
// 				{
// 					arValues[arValues.length] = this.offers[i].TREE[index];
// 				}
// 				boolSearch = true;
// 			}
// 		}
// 	}
// 	return (boolSearch ? arValues : false);
// };
//
// window.JCCatalogSection.prototype.GetCanBuy = function(arFilter)
// {
// 	var i = 0,
// 		j,
// 		boolSearch = false,
// 		boolOneSearch = true;
//
// 	for (i = 0; i < this.offers.length; i++)
// 	{
// 		boolOneSearch = true;
// 		for (j in arFilter)
// 		{
// 			if (arFilter[j] !== this.offers[i].TREE[j])
// 			{
// 				boolOneSearch = false;
// 				break;
// 			}
// 		}
// 		if (boolOneSearch)
// 		{
// 			if (this.offers[i].CAN_BUY)
// 			{
// 				boolSearch = true;
// 				break;
// 			}
// 		}
// 	}
// 	return boolSearch;
// };
//
// window.JCCatalogSection.prototype.SetCurrent = function()
// {
// 	var i = 0,
// 		j = 0,
// 		arCanBuyValues = [],
// 		strName = '',
// 		arShowValues = false,
// 		arFilter = {},
// 		tmpFilter = [],
// 		current = this.offers[this.offerNum].TREE;
//
// 	for (i = 0; i < this.treeProps.length; i++)
// 	{
// 		strName = 'PROP_'+this.treeProps[i].ID;
// 		arShowValues = this.GetRowValues(arFilter, strName);
// 		if (!arShowValues)
// 		{
// 			break;
// 		}
// 		if (BX.util.in_array(current[strName], arShowValues))
// 		{
// 			arFilter[strName] = current[strName];
// 		}
// 		else
// 		{
// 			arFilter[strName] = arShowValues[0];
// 			this.offerNum = 0;
// 		}
// 		if (this.showAbsent)
// 		{
// 			arCanBuyValues = [];
// 			tmpFilter = [];
// 			tmpFilter = BX.clone(arFilter, true);
// 			for (j = 0; j < arShowValues.length; j++)
// 			{
// 				tmpFilter[strName] = arShowValues[j];
// 				if (this.GetCanBuy(tmpFilter))
// 				{
// 					arCanBuyValues[arCanBuyValues.length] = arShowValues[j];
// 				}
// 			}
// 		}
// 		else
// 		{
// 			arCanBuyValues = arShowValues;
// 		}
// 		this.UpdateRow(i, arFilter[strName], arShowValues, arCanBuyValues);
// 	}
// 	this.selectedValues = arFilter;
// 	this.ChangeInfo();
// };
//
// window.JCCatalogSection.prototype.ChangeInfo = function()
// {
// 	var i = 0,
// 		j,
// 		index = -1,
// 		boolOneSearch = true;
//
// 	for (i = 0; i < this.offers.length; i++)
// 	{
// 		boolOneSearch = true;
// 		for (j in this.selectedValues)
// 		{
// 			if (this.selectedValues[j] !== this.offers[i].TREE[j])
// 			{
// 				boolOneSearch = false;
// 				break;
// 			}
// 		}
// 		if (boolOneSearch)
// 		{
// 			index = i;
// 			break;
// 		}
// 	}
// 	if (-1 < index)
// 	{
// 		if (!!this.obPict)
// 		{
// 			if (!!this.offers[index].PREVIEW_PICTURE)
// 			{
// 				BX.adjust(this.obPict, {style: {backgroundImage: 'url('+this.offers[index].PREVIEW_PICTURE.SRC+')'}});
// 			}
// 			else
// 			{
// 				BX.adjust(this.obPict, {style: {backgroundImage: 'url('+this.defaultPict.pict.SRC+')'}});
// 			}
// 		}
// 		if (this.secondPict && !!this.obSecondPict)
// 		{
// 			if (!!this.offers[index].PREVIEW_PICTURE_SECOND)
// 			{
// 				BX.adjust(this.obSecondPict, {style: {backgroundImage: 'url('+this.offers[index].PREVIEW_PICTURE_SECOND.SRC+')'}});
// 			}
// 			else if (!!this.offers[index].PREVIEW_PICTURE.SRC)
// 			{
// 				BX.adjust(this.obSecondPict, {style: {backgroundImage: 'url('+this.offers[index].PREVIEW_PICTURE.SRC+')'}});
// 			}
// 			else if (!!this.defaultPict.secondPict)
// 			{
// 				BX.adjust(this.obSecondPict, {style: {backgroundImage: 'url('+this.defaultPict.secondPict.SRC+')'}});
// 			}
// 			else
// 			{
// 				BX.adjust(this.obSecondPict, {style: {backgroundImage: 'url('+this.defaultPict.pict.SRC+')'}});
// 			}
// 		}
// 		if (this.showSkuProps && !!this.obSkuProps)
// 		{
// 			if (0 === this.offers[index].DISPLAY_PROPERTIES.length)
// 			{
// 				BX.adjust(this.obSkuProps, {style: {display: 'none'}, html: ''});
// 			}
// 			else
// 			{
// 				BX.adjust(this.obSkuProps, {style: {display: ''}, html: this.offers[index].DISPLAY_PROPERTIES});
// 			}
// 		}
// 		this.setPrice(this.offers[index].PRICE);
// 		this.offerNum = index;
// 		this.QuantitySet(this.offerNum);
// 	}
// };
//
// window.JCCatalogSection.prototype.setPrice = function(price)
// {
// 	var strPrice,
// 		obData;
//
// 	if (!!this.obPrice)
// 	{
// 		strPrice = BX.Currency.currencyFormat(price.DISCOUNT_VALUE, price.CURRENCY, true);
// 		if (this.showOldPrice && (price.DISCOUNT_VALUE !== price.VALUE))
// 		{
// 			strPrice += ' <span>'+BX.Currency.currencyFormat(price.VALUE, price.CURRENCY, true)+'</span>';
// 		}
// 		BX.adjust(this.obPrice, {html: strPrice});
// 		if (this.showPercent)
// 		{
// 			if (price.DISCOUNT_VALUE !== price.VALUE)
// 			{
// 				obData = {
// 					style: {
// 						display: ''
// 					},
// 					html: price.DISCOUNT_DIFF_PERCENT
// 				};
// 			}
// 			else
// 			{
// 				obData = {
// 					style: {
// 						display: 'none'
// 					},
// 					html: ''
// 				};
// 			}
// 			if (!!this.obDscPerc)
// 			{
// 				BX.adjust(this.obDscPerc, obData);
// 			}
// 			if (!!this.obSecondDscPerc)
// 			{
// 				BX.adjust(this.obSecondDscPerc, obData);
// 			}
// 		}
// 	}
// };
//
// window.JCCatalogSection.prototype.Compare = function()
// {
// 	var compareParams, compareLink;
// 	if (!!this.compareData.compareUrl)
// 	{
// 		switch (this.productType)
// 		{
// 			case 0://no catalog
// 			case 1://product
// 			case 2://set
// 				compareLink = this.compareData.compareUrl.replace('#ID#', this.product.id.toString());
// 				break;
// 			case 3://sku
// 				compareLink = this.compareData.compareUrl.replace('#ID#', this.offers[this.offerNum].ID);
// 				break;
// 		}
// 		compareParams = {
// 			ajax_action: 'Y'
// 		};
// 		BX.ajax.loadJSON(
// 			compareLink,
// 			compareParams,
// 			BX.proxy(this.CompareResult, this)
// 		);
// 	}
// };
//
// window.JCCatalogSection.prototype.CompareResult = function(result)
// {
// 	var popupContent, popupButtons, popupTitle;
// 	if (!!this.obPopupWin)
// 	{
// 		this.obPopupWin.close();
// 	}
// 	if (typeof result !== 'object')
// 	{
// 		return false;
// 	}
// 	this.InitPopupWindow();
// 	popupTitle = {
// 		content: BX.create('div', {
// 			style: { marginRight: '30px', whiteSpace: 'nowrap' },
// 			text: BX.message('COMPARE_TITLE')
// 		})
// 	};
// 	if (result.STATUS === 'OK')
// 	{
// 		BX.onCustomEvent('OnCompareChange');
// 		popupContent = '<div style="width: 96%; margin: 10px 2%; text-align: center;"><p>'+BX.message('COMPARE_MESSAGE_OK')+'</p></div>';
// 		if (this.showClosePopup)
// 		{
// 			popupButtons = [
// 				new BasketButton({
// 					ownerClass: this.obProduct.parentNode.parentNode.className,
// 					text: BX.message('BTN_MESSAGE_COMPARE_REDIRECT'),
// 					events: {
// 						click: BX.delegate(this.CompareRedirect, this)
// 					},
// 					style: {marginRight: '10px'}
// 				}),
// 				new BasketButton({
// 					ownerClass: this.obProduct.parentNode.parentNode.className,
// 					text: BX.message('BTN_MESSAGE_CLOSE_POPUP'),
// 					events: {
// 						click: BX.delegate(this.obPopupWin.close, this.obPopupWin)
// 					}
// 				})
// 			];
// 		}
// 		else
// 		{
// 			popupButtons = [
// 				new BasketButton({
// 					ownerClass: this.obProduct.parentNode.parentNode.className,
// 					text: BX.message('BTN_MESSAGE_COMPARE_REDIRECT'),
// 					events: {
// 						click: BX.delegate(this.CompareRedirect, this)
// 					}
// 				})
// 			];
// 		}
// 	}
// 	else
// 	{
// 		popupContent = '<div style="width: 96%; margin: 10px 2%; text-align: center;"><p>'+(!!result.MESSAGE ? result.MESSAGE : BX.message('COMPARE_UNKNOWN_ERROR'))+'</p></div>';
// 		popupButtons = [
// 			new BasketButton({
// 				ownerClass: this.obProduct.parentNode.parentNode.className,
// 				text: BX.message('BTN_MESSAGE_CLOSE'),
// 				events: {
// 					click: BX.delegate(this.obPopupWin.close, this.obPopupWin)
// 				}
//
// 			})
// 		];
// 	}
// 	this.obPopupWin.setTitleBar(popupTitle);
// 	this.obPopupWin.setContent(popupContent);
// 	this.obPopupWin.setButtons(popupButtons);
// 	this.obPopupWin.show();
// 	return false;
// };
//
// window.JCCatalogSection.prototype.CompareRedirect = function()
// {
// 	if (!!this.compareData.comparePath)
// 	{
// 		location.href = this.compareData.comparePath;
// 	}
// 	else
// 	{
// 		this.obPopupWin.close();
// 	}
// };
//
// window.JCCatalogSection.prototype.InitBasketUrl = function()
// {
// 	this.basketUrl = (this.basketMode === 'ADD' ? this.basketData.add_url : this.basketData.buy_url);
// 	switch (this.productType)
// 	{
// 		case 1://product
// 		case 2://set
// 			this.basketUrl = this.basketUrl.replace('#ID#', this.product.id.toString());
// 			break;
// 		case 3://sku
// 			this.basketUrl = this.basketUrl.replace('#ID#', this.offers[this.offerNum].ID);
// 			break;
// 	}
// 	this.basketParams = {
// 		'ajax_basket': 'Y'
// 	};
// 	if (this.showQuantity)
// 	{
// 		this.basketParams[this.basketData.quantity] = this.obQuantity.value;
// 	}
// 	if (!!this.basketData.sku_props)
// 	{
// 		this.basketParams[this.basketData.sku_props_var] = this.basketData.sku_props;
// 	}
// };
//
// window.JCCatalogSection.prototype.FillBasketProps = function()
// {
// 	if (!this.visual.BASKET_PROP_DIV)
// 	{
// 		return;
// 	}
// 	var
// 		i = 0,
// 		propCollection = null,
// 		foundValues = false,
// 		obBasketProps = null;
//
// 	if (this.basketData.useProps && !this.basketData.emptyProps)
// 	{
// 		if (!!this.obPopupWin && !!this.obPopupWin.contentContainer)
// 		{
// 			obBasketProps = this.obPopupWin.contentContainer;
// 		}
// 	}
// 	else
// 	{
// 		obBasketProps = BX(this.visual.BASKET_PROP_DIV);
// 	}
// 	if (!!obBasketProps)
// 	{
// 		propCollection = obBasketProps.getElementsByTagName('select');
// 		if (!!propCollection && !!propCollection.length)
// 		{
// 			for (i = 0; i < propCollection.length; i++)
// 			{
// 				if (!propCollection[i].disabled)
// 				{
// 					switch(propCollection[i].type.toLowerCase())
// 					{
// 						case 'select-one':
// 							this.basketParams[propCollection[i].name] = propCollection[i].value;
// 							foundValues = true;
// 							break;
// 						default:
// 							break;
// 					}
// 				}
// 			}
// 		}
// 		propCollection = obBasketProps.getElementsByTagName('input');
// 		if (!!propCollection && !!propCollection.length)
// 		{
// 			for (i = 0; i < propCollection.length; i++)
// 			{
// 				if (!propCollection[i].disabled)
// 				{
// 					switch(propCollection[i].type.toLowerCase())
// 					{
// 						case 'hidden':
// 							this.basketParams[propCollection[i].name] = propCollection[i].value;
// 							foundValues = true;
// 							break;
// 						case 'radio':
// 							if (propCollection[i].checked)
// 							{
// 								this.basketParams[propCollection[i].name] = propCollection[i].value;
// 								foundValues = true;
// 							}
// 							break;
// 						default:
// 							break;
// 					}
// 				}
// 			}
// 		}
// 	}
// 	if (!foundValues)
// 	{
// 		this.basketParams[this.basketData.props] = [];
// 		this.basketParams[this.basketData.props][0] = 0;
// 	}
// };
//
// window.JCCatalogSection.prototype.Add2Basket = function()
// {
// 	this.basketMode = 'ADD';
// 	this.Basket();
// };
//
// window.JCCatalogSection.prototype.BuyBasket = function()
// {
// 	this.basketMode = 'BUY';
// 	this.Basket();
// };
//
// window.JCCatalogSection.prototype.SendToBasket = function()
// {
// 	if (!this.canBuy)
// 	{
// 		return;
// 	}
// 	this.InitBasketUrl();
// 	this.FillBasketProps();
// 	BX.ajax.loadJSON(
// 		this.basketUrl,
// 		this.basketParams,
// 		BX.delegate(this.BasketResult, this)
// 	);
// };
//
// window.JCCatalogSection.prototype.Basket = function()
// {
// 	var contentBasketProps = '';
// 	if (!this.canBuy)
// 	{
// 		return;
// 	}
// 	switch (this.productType)
// 	{
// 	case 1://product
// 	case 2://set
// 		if (this.basketData.useProps && !this.basketData.emptyProps)
// 		{
// 			this.InitPopupWindow();
// 			this.obPopupWin.setTitleBar({
// 				content: BX.create('div', {
// 					style: { marginRight: '30px', whiteSpace: 'nowrap' },
// 					text: BX.message('TITLE_BASKET_PROPS')
// 				})
// 			});
// 			if (BX(this.visual.BASKET_PROP_DIV))
// 			{
// 				contentBasketProps = BX(this.visual.BASKET_PROP_DIV).innerHTML;
// 			}
// 			this.obPopupWin.setContent(contentBasketProps);
// 			this.obPopupWin.setButtons([
// 				new BasketButton({
// 					ownerClass: this.obProduct.parentNode.parentNode.className,
// 					text: BX.message('BTN_MESSAGE_SEND_PROPS'),
// 					events: {
// 						click: BX.delegate(this.SendToBasket, this)
// 					}
// 				})
// 			]);
// 			this.obPopupWin.show();
// 		}
// 		else
// 		{
// 			this.SendToBasket();
// 		}
// 		break;
// 	case 3://sku
// 		this.SendToBasket();
// 		break;
// 	}
// };
//
// window.JCCatalogSection.prototype.BasketResult = function(arResult)
// {
// 	var strContent = '',
// 		strPict = '',
// 		successful,
// 		buttons = [];
//
// 	if (!!this.obPopupWin)
// 	{
// 		this.obPopupWin.close();
// 	}
// 	if ('object' !== typeof arResult)
// 	{
// 		return false;
// 	}
// 	successful = (arResult.STATUS === 'OK');
// 	if (successful && this.basketAction === 'BUY')
// 	{
// 		this.BasketRedirect();
// 	}
// 	else
// 	{
// 		this.InitPopupWindow();
// 		if (successful)
// 		{
// 			BX.onCustomEvent('OnBasketChange');
// 			switch(this.productType)
// 			{
// 			case 1://
// 			case 2://
// 				strPict = this.product.pict.SRC;
// 				break;
// 			case 3:
// 				strPict = (!!this.offers[this.offerNum].PREVIEW_PICTURE ?
// 					this.offers[this.offerNum].PREVIEW_PICTURE.SRC :
// 					this.defaultPict.pict.SRC
// 				);
// 				break;
// 			}
// 			strContent = '<div style="width: 96%; margin: 10px 2%; text-align: center;"><img src="'+strPict+'" height="130" style="max-height:130px"><p>'+this.product.name+'</p></div>';
// 			if (this.showClosePopup)
// 			{
// 				buttons = [
// 					new BasketButton({
// 						ownerClass: this.obProduct.parentNode.parentNode.className,
// 						text: BX.message("BTN_MESSAGE_BASKET_REDIRECT"),
// 						events: {
// 							click: BX.delegate(this.BasketRedirect, this)
// 						},
// 						style: {marginRight: '10px'}
// 					}),
// 					new BasketButton({
// 						ownerClass: this.obProduct.parentNode.parentNode.className,
// 						text: BX.message("BTN_MESSAGE_CLOSE_POPUP"),
// 						events: {
// 							click: BX.delegate(this.obPopupWin.close, this.obPopupWin)
// 						}
// 					})
// 				];
// 			}
// 			else
// 			{
// 				buttons = [
// 					new BasketButton({
// 						ownerClass: this.obProduct.parentNode.parentNode.className,
// 						text: BX.message("BTN_MESSAGE_BASKET_REDIRECT"),
// 						events: {
// 							click: BX.delegate(this.BasketRedirect, this)
// 						}
// 					})
// 				];
// 			}
// 		}
// 		else
// 		{
// 			strContent = '<div style="width: 96%; margin: 10px 2%; text-align: center;"><p>'+(!!arResult.MESSAGE ? arResult.MESSAGE : BX.message('BASKET_UNKNOWN_ERROR'))+'</p></div>';
// 			buttons = [
// 				new BasketButton({
// 					ownerClass: this.obProduct.parentNode.parentNode.className,
// 					text: BX.message('BTN_MESSAGE_CLOSE'),
// 					events: {
// 						click: BX.delegate(this.obPopupWin.close, this.obPopupWin)
// 					}
// 				})
// 			];
// 		}
// 		this.obPopupWin.setTitleBar({
// 			content: BX.create('div', {
// 				style: { marginRight: '30px', whiteSpace: 'nowrap' },
// 				text: (successful ? BX.message('TITLE_SUCCESSFUL') : BX.message('TITLE_ERROR'))
// 			})
// 		});
// 		this.obPopupWin.setContent(strContent);
// 		this.obPopupWin.setButtons(buttons);
// 		this.obPopupWin.show();
// 	}
// };
//
// window.JCCatalogSection.prototype.BasketRedirect = function()
// {
// 	location.href = (!!this.basketData.basketUrl ? this.basketData.basketUrl : BX.message('BASKET_URL'));
// };
//
// window.JCCatalogSection.prototype.InitPopupWindow = function()
// {
// 	if (!!this.obPopupWin)
// 	{
// 		return;
// 	}
// 	this.obPopupWin = BX.PopupWindowManager.create('CatalogSectionBasket_'+this.visual.ID, null, {
// 		autoHide: false,
// 		offsetLeft: 0,
// 		offsetTop: 0,
// 		overlay : true,
// 		closeByEsc: true,
// 		titleBar: true,
// 		closeIcon: {top: '10px', right: '10px'}
// 	});
// };
// })(window);
/* End */
;
; /* Start:"a:4:{s:4:"full";s:100:"/local/templates/psk2024/components/bmhouse/comments.all.index/reviews_main/script.js?17314868311785";s:6:"source";s:85:"/local/templates/psk2024/components/bmhouse/comments.all.index/reviews_main/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
$(document).ready(function () {

  document.querySelectorAll('.comment-toggle-btn').forEach(function(button){
    button.addEventListener('click', function(){
      const commentContainer = this.closest('.bmhouse-comment-text');
      if(commentContainer){
        commentContainer.classList.toggle("comment-text--expanded")

        this.textContent = commentContainer.classList.contains("comment-text--expanded") ? "Свернуть" : "Читать полностью";
      }
    })
  })
  // $("#bmhouse-comments .bmhouse-comments-block").slick({
  //   infinite: true,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   lazyLoad: "ondemand",
  //   adaptiveHeight: true,
  //   arrows: false,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 660,
  //       settings: {
  //         slidesToShow: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 400,
  //       settings: {
  //         slidesToShow: 1,
  //       },
  //     },
  //   ],
  // });

  // var heightFixInterval;
  // heightFixInterval = setInterval(function () {
  //   if ($(".bmhouse-comments-block.slick-initialized.slick-slider:not(.bmhouse-height-fixed)").length) {
  //     var maxHeight = 0;

  //     $(".bmhouse-comment.slick-slide").each(function (index, element) {
  //       var height = $(element).height() + 42;

  //       if (height > maxHeight) {
  //         maxHeight = height;
  //       }
  //     });

  //     $(".bmhouse-comment.slick-slide").css("height", maxHeight);
  //     $(".bmhouse-comments-block.slick-initialized.slick-slider").addClass("bmhouse-height-fixed");
  //     clearInterval(heightFixInterval);
  //   }
  // }, 1000);
});

/* End */
;; /* /local/templates/psk2024/components/bitrix/catalog.section/product-slide-card/script.js?168112496244798*/
; /* /local/templates/psk2024/components/bmhouse/comments.all.index/reviews_main/script.js?17314868311785*/


; /* Start:"a:4:{s:4:"full";s:66:"/local/templates/psk2024/js/compiled/filter.min.js?175223829319326";s:6:"source";s:50:"/local/templates/psk2024/js/compiled/filter.min.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
};
"function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
    value: function (e, t) {
        if (null === e) throw new TypeError("Cannot convert undefined or null to object");
        for (var o = Object(e), r = 1; r < arguments.length; r++) {
            var n = arguments[r];
            if (null !== n) for (var l in n) Object.prototype.hasOwnProperty.call(n, l) && (o[l] = n[l])
        }
        return o
    }, writable: !0, configurable: !0
}), "undefined" == typeof Filter && (window.Filter = function (e) {
    var t = this;
    if (void 0 === (t.options = e)) throw new Error("No filter options specified!");
    t.node = $("." + e.selector), t.form_node = t.node.find("form"), t.click_timeout = null, t.node.find('a[href="#"]').attr("ondragstart", "return false;").click(function (e) {
        e.preventDefault()
    }), t.initClearButtons(), t.initApplyButtons(), t.initHideShowBtn(), t.initColorWheel(), t.initPriceSlider(), t.initFakeSelects(), t.registerInputForSubmit("." + e.selector + "__auto-submit input"), t.registerInputForSubmit("." + e.selector + "__auto-submit select"), $("." + e.selector + "__auto-submit select").each(function (e, t) {
        var o = (t = $(t)).find("option[selected]").attr("id");
        t.attr("name", o)
    })
        // , e.ajax_params && e.ajax_params.SEF_SET_FILTER_URL && t.bindUrlToButton(e.set_filter_selector, e.ajax_params.SEF_SET_FILTER_URL)
}, Filter.prototype.triggerSubmit = function () {
    var e = this.options;
    this.click(function () {
        $(e.set_filter_selector).trigger("click")
    })
}, Filter.prototype.generateLinkWithParams = function (e) {
    var t = location.search.substring(1),
        o = decodeURI(t).replace(/"/g, '\\"').replace(/&/g, '","').replace(/\=/g, '":"'), r = {}, n = "";
    try {
        r = JSON.parse('{"' + o + '"}')
    } catch (e) {
    }
    if ("object" === (void 0 === (e = window.Object.assign({}, r, e)) ? "undefined" : _typeof(e))) {
        for (var l in n = [], e) e.hasOwnProperty(l) && n.push(l + "=" + e[l]);
        n = n.join("&")
    }
    return window.location.href.split("?")[0] + "?" + n
}, Filter.prototype.registerInputForSubmit = function (e) {
    var n = this;

    $(e).on("change", function () {
        var e = $(this), t = e[0].type && "select-one" == e[0].type.toLowerCase();

        if ("Y" == e.attr("data-to-params")) {
            var o = {};
            o[e.attr("name")] = e.val(), document.location.href = n.generateLinkWithParams(o)
        } else {
            if (t) {
                var r = e.find("option[selected]").attr("id");
                e.attr("name", r)
            }
            n.triggerSubmit()
        }
    })
}, Filter.prototype.bindUrlToButton = function (e, t) {
    var o, r, n = $(e)[0];
    // console.log($(e)[0]);
    n && ("submit" == n.type && (n.type = "button"), BX.bind(n, "click", (o = t, r = function (e) {
        // return window.location.href = e, !1

    }, function () {
        return r(o)
    })))
}, Filter.prototype.click = function (e) {
    var t = this;
    t.click_timeout && clearTimeout(t.click_timeout), t.click_timeout = setTimeout(function () {
        t.reload(e)
    }, 200)
}, Filter.prototype.reload = function (t) {
    var o = this, r = o.options, e = [{name: "ajax", value: "y"}];

   

    o.gatherInputsValues(e, o.form_node.find("input, select")), BX.ajax.loadJSON(o.options.ajax_url, o.valueToPost(e), function (e) {
       /* console.log(e);  */
        /* console.log(o); */
        $('#psk-overlay').addClass('_active');       
        $.ajax({
            type: "POST",
            url: e.FILTER_AJAX_URL+'?sort='+$('.catalog-body__sort .custom-select__option._active').attr('data-value'),
            data: {'lazy': 'N'},
            success: function (msg) {
                resetButtonsPrintCards();
                $('.catalog-filters__item').removeClass('selected');
                $('.catalog-filters__item .catalog-filters__item-title').removeClass('_active');
              /*   $('.catalog-filters__item .catalog-filters__item-body').attr('hidden','hidden'); */

                for (const [key, value] of Object.entries(e.ITEMS)) {


                    if(value.DISPLAY_EXPANDED=="Y"){
                       /*  console.log('.catalog-filters__item.item'+key); */
                        // $('.item4').addClass('selected');
                        $('.catalog-filters__item.item'+key).addClass('selected');
                        $('.catalog-filters__item.item'+key+' .catalog-filters__item-title').addClass('_active');
                        $('.catalog-filters__item.item'+key+' .catalog-filters__item-body').removeAttr('hidden');
                    }
                    for (const [vkey, vval] of Object.entries(value.VALUES)) {
                        // vval.VALUES;
                        $('#'+vval.CONTROL_ID).attr('disabled',vval.DISABLED);
                        if(vval.DISABLED)
                            $('#'+vval.CONTROL_ID).closest('li').addClass('disabled');
                        else
                            $('#'+vval.CONTROL_ID).closest('li').removeClass('disabled');
                    }
                }
                

                $('.catalog-body .accepted_filter_tags').html($(msg).find('.accepted_filter_tags').html());
                $('.catalog-body .catalog-list').html($(msg).find('.catalog-list').html());
                $('.catalog-body .pagenContainer').html($(msg).find('.pagenContainer').html());
                $('#psk-overlay').removeClass('_active');
               /*  $('.section-top').html($(msg).find('.section-top').html()); */
                $('.catalog .section-top').html($(msg).find('.catalog .section-top').html());
                $('.psk-seo-info').html($(msg).find('.psk-seo-info').html());
                $('#breadcrumbs').html($(msg).find('#breadcrumbs').html());
                /* $('.catalog-body').html($(msg).find('.catalog-body').html()); */ 
                $('.catalog-filter__trigger').html($(msg).find('.catalog-filter__trigger').html());              
                var parser = new DOMParser();
                var doc = parser.parseFromString(msg, 'text/html');              
                $('title').html(doc.querySelector('title').textContent);
                $('.custom-select__wrapper').html($(msg).find('.custom-select__wrapper').html());              
              
                // TEXT CLAMP =====================================================================================
                const maxLengthTexts = document.querySelectorAll("[data-text-max-rows]");

                if (maxLengthTexts) {
                    textTruncate(maxLengthTexts);

                    function textTruncate(elements) {
                        elements.forEach((element) => {
                            const maxRows = Number(element.dataset.textMaxRows);
                            $clamp(element, { clamp: maxRows });
                        });
                    }
                }
                initProductImagesSlider();
                initCustomSelect();  
                initSidebarMobile();
                initChangedEvent();
                initFavorite();
                initProductControlsBtns();
                initCardControlsBtns();
                initTippyElements();
                initShowResult();
                initProductBodyPrint();

               let seoUrl = $(doc).find('#url-seo').val();
               
                 if (history.pushState) {

                    if(seoUrl){
                        var baseUrl = window.location.protocol + "//" + window.location.host + seoUrl;
                    } else {
                        var baseUrl = window.location.protocol + "//" + window.location.host + e.FILTER_AJAX_URL;
                    }                  
                   
                    try {
                        history.pushState(null, null, baseUrl);               
                        return;
                    } catch(e) {}
                    location.hash = '#' + baseUrl;

                }
                else {
                    console.warn('History API не поддерживается');
                }
               
            }
        });
        // e && e.ITEMS && e.SEF_SET_FILTER_URL && (o.bindUrlToButton(r.set_filter_selector, e.SEF_SET_FILTER_URL), t && t())
    })


}, Filter.prototype.gatherInputsValues = function (e, t) {
    for (var o = 0; o < t.length; o++) {
        var r = t[o];
        if (!r.disabled && r.type) switch (r.type.toLowerCase()) {
            case"text":
            case"textarea":
            case"password":
            case"hidden":
            case"select-one":
                r.value.length && (e[e.length] = {name: r.name, value: r.value});
                break;
            case"radio":
            case"checkbox":
                r.checked && (e[e.length] = {name: r.name, value: r.value})
        }
    }
}, Filter.prototype.valueToPost = function (e) {
    for (var t = [], o = t, r = 0; r < e.length;) {
        var n = e[r].name.indexOf("[");
        if (-1 == n) o[e[r].name] = e[r].value, o = t, r++; else {
            var l = e[r].name.substring(0, n), c = e[r].name.substring(n + 1);
            o[l] || (o[l] = []);
            var s = c.indexOf("]");
            -1 == s ? (o = t, r++) : 0 == s ? (o = o[l], e[r].name = "" + o.length) : (o = o[l], e[r].name = c.substring(0, s) + c.substring(s + 1))
        }
    }
    return t
}, Filter.prototype.initHideShowBtn = function () {
    var o = this, r = o.options, n = $("." + r.selector + "__hide-btn a"), e = window.innerWidth < r.visible_width;
    o.toggle(e), n.click(function (e) {
        e.preventDefault();
        var t = n.text().trim() == r.text_hidden;
        o.toggle(t)
    })
}, Filter.prototype.initApplyButtons = function () {
    var n = this, l = n.options;
    $("." + l.selector + "__button--apply").click(function (e) {
        e.preventDefault();
        var t = $(this).parents(".psk-fake-select"), o = t.find(".psk-fake-select__header"),
            r = t.find('input[type="checkbox"]:checked').map(function (e, t) {
                return $(t).next().text()
            }).get().join(", ");
        "" == r && (r = l.text_not_selected), o.trigger("click").find("span").text(r), n.triggerSubmit()
    })
}, Filter.prototype.initClearButtons = function () {
    var e = this.options;
    $("." + e.selector + "__button--clear").click(function () {
        window.location.href = e.ajax_params.SEF_DEL_FILTER_URL
    })
}, Filter.prototype.initFakeSelects = function () {
    this.node.find(".psk-fake-select input").change(function () {
        var e = $(this);
        "1" == e.next().attr("data-autocheck-from") && e.prop("checked") && $.each($(".psk-fake-select").find('input[type="checkbox"]'), function (e, t) {
            var o = $(t);
            "1" == o.next().attr("data-autocheck-to") && o.prop("checked", !0)
        })
    })
}, Filter.prototype.toggle = function (e) {
    var t = this.options, o = t.selector + "__form", r = $("." + o), n = $("." + t.selector + "__hide-btn a");
    r[e ? "addClass" : "removeClass"](o + "--hidden"), n.html(t["text_" + (e ? "visible" : "hidden")])
}, Filter.prototype.initColorWheel = function () {
    var o = this, r = o.options;
    if (o.colors_node = $("." + r.selector + "__colors"), 0 !== o.colors_node.length) {
        o.colors_select_node = o.colors_node.find("." + r.selector + "__colors-select"), o.colors_container_node = o.colors_node.find("." + r.selector + "__colors-container"), o.colors_selected_color_node = $("." + r.selector + "__colors-selected-color"), o.colors_selected_text_node = $("." + r.selector + "__colors-selected-text"), o.last_used_color = null;
        for (var e = o.colors_select_node[0].options, t = 0; t < e.length; t++) {
            var n = e[t], l = $(n).attr("data-color").split("|");
            n.selected && (o.last_used_color = l, o.colors_select_node.attr("name", $(n).attr("id")), o.clearColor(!0)), "0" == l[0] ? (o.colors_container_node.append('<a href="#" class="psk-filter__colors-center"><span>' + r.text_colors_clear_title + '</span><span title="' + r.text_colors_clear_hint + '"></span></a>'), o.colors_center_node = o.colors_node.find("." + r.selector + "__colors-center"), o.colors_center_clear_visible_class = r.selector + "__colors-center--clear-visible") : o.colors_container_node.append('<a href="#" data-color="' + $(n).attr("id") + '" class="psk-filter__colors-color psk-filter__colors-color--' + l[2] + '" style="background-color: ' + l[0] + ';"></a>')
        }
        o.colors_select_node.change(function () {
            var e = o.colors_select_node.find("option[selected]"), t = e.attr("data-color").split("|");
            o.colors_select_node.attr("name", e.attr("id")), "0" == t[0] ? (o.last_used_color = null, o.clearColor()) : o.setColor(t, !1, !0)
        }), $("." + r.selector + "__colors-picker__header").click(function (e) {
            e.preventDefault(), o.colors_node.toggleClass(r.selector + "__colors--visible")
        }), o.colors_node.find("." + r.selector + "__colors-color").hover(function () {
            var e = $(this).attr("data-color").split("|");
            o.setColor(e, !0)
        }).mouseleave(function () {
            o.clearColor(!0)
        }).click(function (e) {
            e.preventDefault();
            var t = $(this).attr("data-color");
            o.colors_select_node.attr("name", t).find("option[selected]").removeAttr("selected"), o.colors_select_node.find('option[id="' + t + '"]').attr("selected", "selected"), o.colors_select_node[0].value = "Y", o.colors_select_node.trigger("change"), o.colors_node.removeClass(r.selector + "__colors--visible")
        }), o.colors_center_node.click(function (e) {
            e.preventDefault(), o.colors_select_node.attr("name", "not-value").find("option[selected]").removeAttr("selected"), o.colors_select_node.find("option").first().attr("selected", "selected"), o.colors_select_node[0].value = "Y", o.colors_select_node.trigger("change"), o.colors_node.removeClass(r.selector + "__colors--visible")
        })
    }
}, Filter.prototype.setColor = function (e, t, o) {
    var r = this;
    o || r.clearColor(t), t || (r.last_used_color = e, r.colors_center_node && r.colors_center_node.addClass(r.colors_center_clear_visible_class), r.triggerSubmit()), r.colors_selected_color_node.css("background-color", e[0]), r.colors_selected_text_node.text(e[1])
}, Filter.prototype.clearColor = function (e) {
    var t = this, o = $(t.colors_select_node[0].options[0]).attr("data-color").split("|")[1];
    t.colors_selected_color_node.removeAttr("style"), t.colors_selected_text_node.text(o), t.colors_center_node && t.colors_center_node.removeClass(t.colors_center_clear_visible_class), e ? t.last_used_color && ("0" != t.last_used_color[0] ? (t.colors_selected_color_node.css("background-color", t.last_used_color[0]), t.colors_center_node && t.colors_center_node.addClass(t.colors_center_clear_visible_class)) : (t.colors_selected_color_node.removeAttr("style"), t.colors_center_node && t.colors_center_node.removeClass(t.colors_center_clear_visible_class)), t.colors_selected_text_node.text(t.last_used_color[1])) : t.triggerSubmit()
}, Filter.prototype.initPriceSlider = function () {
    var t = this, e = t.options;
    t.range_node = $("." + e.selector + "__range-slider"), 0 !== t.range_node.length && (t.range_input_node = t.range_node.find("input"), t.range_thumb_node = $("." + e.selector + "__range-slider-thumb"), t.range_current_text_node = $("." + e.selector + "__range-slider-current-text"), t.range_pressed = !1, t.range_min = ~~t.range_thumb_node.attr("data-min"), t.range_max = ~~t.range_thumb_node.attr("data-max"), t.range_current = ~~t.range_thumb_node.attr("data-current"), $("." + e.selector + "__range-slider-min-text").text(t.range_min), $("." + e.selector + "__range-slider-max-text").text(t.range_max), $("." + e.selector + "__range-slider-current-text").text(t.range_current), t.range_thumb_node.css("width", ~~(100 * (t.range_current - t.range_min)) / (t.range_max - t.range_min) + "%"), t.range_node.bind("touchstart mousedown", function (e) {
        t.range_pressed = !0, t.priceSliderChange(e)
    }), $(document).bind("touchend mouseup mouseleave", function () {
        t.range_pressed && ($("body").removeClass("no-select"), t.range_pressed = !1, t.range_input_node.val(t.range_current_text_node.text()), t.triggerSubmit())
    }).bind("touchmove mousemove", function (e) {
        t.range_pressed && ($("body").addClass("no-select"), t.priceSliderChange(e))
    }))
}, Filter.prototype.priceSliderChange = function (e) {
    var t = this,
        o = ~~(100 * ((void 0 !== e.pageX ? e.pageX : (e.targetTouches || e.originalEvent.touches)[0].pageX) - t.range_node.offset().left) / t.range_node.width());
    0 <= o && o <= 100 && (t.range_thumb_node.css("width", o + "%"), t.range_current_text_node.text(~~((t.range_max - t.range_min) * (o / 100)) + t.range_min))
});



addEventListener("popstate",function(e){
    // alert("location: " + document.location);
    $.ajax({
        type: "POST",
        url: document.location,
        data: {'lazy': 'N'},
        success: function (msg) {

            $('.catalog-inner').html($(msg).find('.catalog-inner').html());

            // for (const [key, value] of Object.entries(e.ITEMS)) {
            //     // console.log(key+': '+value.VALUES);
            //     for (const [vkey, vval] of Object.entries(value.VALUES)) {
            //         // vval.VALUES;
            //         $('#'+vval.CONTROL_ID).attr('disabled',vval.DISABLED);
            //         if(vval.DISABLED)
            //             $('#'+vval.CONTROL_ID).closest('li').addClass('disabled');
            //         else
            //             $('#'+vval.CONTROL_ID).closest('li').removeClass('disabled');
            //     }
            // }
            //
            //
            // $('.catalog-body .accepted_filter_tags').html($(msg).find('.accepted_filter_tags').html());
            // $('.catalog-body .catalog-list').html($(msg).find('.catalog-list').html());
            // $('.catalog-body .pagenContainer').html($(msg).find('.pagenContainer').html());
            // $('#psk-overlay').removeClass('_active');


            // TEXT CLAMP =====================================================================================
            const maxLengthTexts = document.querySelectorAll("[data-text-max-rows]");

            if (maxLengthTexts) {
                textTruncate(maxLengthTexts);

                function textTruncate(elements) {
                    elements.forEach((element) => {
                        const maxRows = Number(element.dataset.textMaxRows);
                        $clamp(element, { clamp: maxRows });
                    });
                }
            }
            initProductImagesSlider();
            // initCustomSelect();

        }
    });
    },false
);
/* End */
;
; /* Start:"a:4:{s:4:"full";s:80:"/local/templates/psk2024/components/bitrix/catalog/main/script.js?16823291941174";s:6:"source";s:65:"/local/templates/psk2024/components/bitrix/catalog/main/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
// $(document).ready(function () {
//   $("#bmhouse-comments .bmhouse-comments-block").slick({
//     infinite: true,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     lazyLoad: "ondemand",
//     adaptiveHeight: true,
//     arrows: false,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 660,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//       {
//         breakpoint: 400,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   });
//   // $('#bmhouse-comments .bmhouse-comment-image img').fancybox();
// });


// BX.ready(function() {
//   podeli
//       .init({
//         type: "catalog", //catalog || item || checkout
//         priceNodeSelector: ".podeli-price",
//         containerNodeSelector: ".catalog_items .item",
//         widgetContainerNodeSelector: ".podeli-container-card",
//         insertMethod: "replace",
//       })
//       .then(() => {
//         setTimeout(() => {
//           podeli.add();
//         }, 1000);
//       });
// })


/* End */
;
; /* Start:"a:4:{s:4:"full";s:112:"/local/templates/psk2024/components/bitrix/catalog/main/bitrix/catalog.element/.default/script.js?17219001709031";s:6:"source";s:97:"/local/templates/psk2024/components/bitrix/catalog/main/bitrix/catalog.element/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/

// document.addEventListener('DOMContentLoaded', function () {
//     var carousel = $('#slider_foto_na_tovar')
//     var list = carousel.find('.psk-products-slider__list')
//     var buttons = carousel.find('.psk-products-slider__inner')
//
//     list.slick({
//         infinite: true,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         appendArrows: buttons,
//         //variableWidth: true,
//         lazyLoad: 'ondemand',
//         responsive: [
//             {
//                 breakpoint: 760,
//                 settings: {
//                     slidesToShow: 3,
//                 },
//             },
//             {
//                 breakpoint: 660,
//                 settings: {
//                     slidesToShow: 3,
//                 },
//             },
//             {
//                 breakpoint: 400,
//                 settings: {
//                     slidesToShow: 2,
//                 },
//             },
//         ],
//     })
// })


// document.addEventListener('DOMContentLoaded', function () {
//     var carousel = $('#slider_analog_drugogo_sezona')
//     var list = carousel.find('.psk-products-slider__list')
//     var buttons = carousel.find('.psk-products-slider__inner')
//
//     list.slick({
//         infinite: true,
//         slidesToShow: 2,
//         slidesToScroll: 1,
//         appendArrows: buttons,
//         lazyLoad: 'ondemand',
//         responsive: [
//             {
//                 breakpoint: 760,
//                 settings: {
//                     slidesToShow: 2,
//                 },
//             },
//             {
//                 breakpoint: 660,
//                 settings: {
//                     slidesToShow: 2,
//                 },
//             },
//             {
//                 breakpoint: 400,
//                 settings: {
//                     slidesToShow: 2,
//                 },
//             },
//         ],
//     })
// })



$(document).ready(function () {

    $('.show_block__trigger').on('click', function (e) {
        e.preventDefault();
        var th = $(this),
            trgt = $(th.attr('href'));
        trgt.slideDown(300);
        th.parent().slideUp(300);
    });

    $('#question_form .submit_question').on('click',function (e) {
        e.preventDefault();
         let error = false;
    
    
    
         if ($('#question_form input[name="name"]').val()=='' || $('#question_form input[name="name"]').val()==null) {
             $('#question_form input[name="name"]').addClass('err');
             error = true;
         }else{
            if($('#question_form input[name="name"]').hasClass('err')){
                $('#question_form input[name="name"]').removeClass('err');
            }
           
         }
         if ($('#question_form textarea[name="question"]').val()=='' || $('#question_form textarea[name="question"]').val()==null) {
             $('#question_form textarea[name="question"]').addClass('err');
             error = true;
         }else{
            if($('#question_form textarea[name="question"]').hasClass('err')){
                $('#question_form textarea[name="question"]').removeClass('err');
            }
           
         }
         if (!$('#question_form .check-input[type="checkbox"]').is(':checked')) {
            $('#question_form .check-label').addClass('err');
            error = true;
        }else{
            if($('#question_form .check-label').hasClass('err')){
                $('#question_form .check-label').removeClass('err');
            }
           
         }
         if(!error) {
             let product_id = $('#question_form input[name="product_id"]').val();
             let product_link = $(location).attr("href");
             let name = $('#question_form input[name="name"]').val();
             let question = $('#question_form textarea[name="question"]').val();
    
             let data = {
                 product_id: product_id,
                 name: name,
                 question: question,
                 product_link: product_link,
             }
    
             // alert(data);
             // console.log(data);
    
    
             /*----------сохраняем вопрос в highload block -------*/
             $.ajax({
                 url: '/local/ajax_query/add_question_product.php',
                 method: 'POST',
                 data: data,
                 success: function(response){
                     // console.log(response);
                     if(response != 'Error') {
                         $('#question_form').css('display','none');
                         $('.OK').css('display','block');
    
    
    
                     }
    
                 }
             })
         }
    
     })

    $('.show_more').on('click',function () {
        let i=0;
        $('.testimonial_row.hide').each(function () {
            if(i<3) $(this).removeClass('hide');
            i++;
        })

        if($('.testimonial_row.hide').length == 0) $('.show_more').addClass('hide');
    })


    $('#send').on('click', function(){


        $.ajax({
            type: "POST",
            url: "/local/ajax_query/dadata_ajax.php",
            data: {inn: $('#inn').val(), action: 'get_dadata'},
            success: function (data) {
                data = $.parseJSON(data);

                $('#org_name').val(data['ORG_NAME']);
                $('#address').val(data['ADDRESS']);
                $('#region').val(data['ADDR_OBL']);
                $('#fias_id').val(data['FIAS_ID']);
                $('#region').focus();

            }
        })
    })

    $('#want_low').on('click', function(){
        $('#get_inn').css('display','block');
    })

    $('#get_inn .layer').on('click', function(){
        $('#get_inn').css('display','none');
    })

    $('#region').on('keydown', function(){

        $('#region_modify').val('Y');
    })
    $('#get_inn .close').on('click', function(){

        $('#get_inn').css('display','none');
    })

    $('#region').suggestions({
        token: '56ea0742257d5538ffc2940d7ec51e725e79d92e',
        type: 'ADDRESS',
        geoLocation: true,
        constraints: {
            locations: {country: '*'}
        },
        /* Вызывается, когда пользователь выбирает одну из подсказок */
        onSelect: function (suggestion) {
            console.log(suggestion);
            $('#fias_id').val(suggestion.data.region_fias_id);
        }
    });

    $('#save').on('click', function(){
        console.log($(location).attr("origin"));

        var error = false
        if(($('#email').val().length < 6) || (($('#email').val().indexOf("@") + 1)==0) || (($('#email').val().indexOf(".") + 1)==0)){
            error = true;
            $('#email').closest('.form-unit').addClass('error');
        }
        if($(location).attr("origin") !== 'https://kz.psk.expert') {
            if ($('#inn').val().trim() == '') {
                error = true;
                $('#inn').closest('.form-unit').addClass('error');
            }
        }

        if(!error) {

            $.ajax({
                type: "POST",
                url: "/local/ajax_query/dadata_ajax.php",
                data: {
                    inn: $('#inn').val(),
                    org_name: $('#org_name').val(),
                    address: $('#address').val(),
                    region: $('#region').val(),
                    fias_id: $('#fias_id').val(),
                    email: $('#email').val(),
                    tel: $('#tel').val(),
                    org_modify: $('#org_modify').val(),
                    region_modify: $('#region_modify').val(),
                    url: window.location.href.slice(0,window.location.href.indexOf('\?')),
                    action: 'send_dadata'
                },
                success: function (data_save) {
                    // data_save = $.parseJSON(data_save);
                    $('#get_inn .modalBody').addClass('sended');
                    $('#get_inn .form').html('<p>Спасибо. Ваш запрос успешно отправлен</p>' +
                        '<p>В течении 10 минут с Вами свяжется менеджер.</p>');
                }
            })
        }
    })
    $('#copy-link').on('click', function(e){
        e.preventDefault();
        let copyLink = $(this).attr('href');
        copyLink = 'https://' + copyLink;        
        writeLink(copyLink);
    })

    async function writeLink(text) {
        try {
          await navigator.clipboard.writeText(text);
          showMessage('Ссылка скопирована!')
        } catch (error) {
          console.error(error.message);
        }
    }

    function showMessage(message){
        let messageElement = $('#copy-message');
        messageElement.text(message);
        messageElement.show();
        setTimeout(function(){
            messageElement.hide();
        }, 3000) 
    }

})
/* End */
;
; /* Start:"a:4:{s:4:"full";s:92:"/local/templates/psk2024/components/bmhouse/comments/detail_product/script.js?16617949809384";s:6:"source";s:77:"/local/templates/psk2024/components/bmhouse/comments/detail_product/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
$(document).ready(
	function () {
		$('#bmhouse-scroll-to-add-button').click(
			function () {
				var formOffsetTop = $('#bmhouse-comments2 .bmhouse-comments-form').offset().top - 110;

				$('html, body').animate(
					{
						scrollTop: formOffsetTop
					},
					500
				);
			}
		);

		$('a.answer').click(function () {
			$('.bmhouse-comment-answer-add').css('display','none');
			$(this).closest('.testimonial_row').find('.bmhouse-comment-answer-add').css('display','block');
		})

		$('#bmhouse-comments2 .bmhouse-comments-form-rating-star').mouseover(
			function () {
				var overedRating = $(this).data('rating');

				$('#bmhouse-comments2 .bmhouse-comments-form-rating-star').css('background-position', '0 0');

				for (var i = 1; i <= overedRating; i++) {
					$('#bmhouse-comments2 .bmhouse-comments-form-rating-star[data-rating="' + i + '"]').css('background-position', '0 -22px');
				}
			}
		);



		$('#bmhouse-comments2 .bmhouse-comments-form-rating-star').click(
			function () {
				$('#bmhouse-comments2 .bmhouse-comments-form-rating').css('border-color', '#fff');

				$('#bmhouse-comments2 .bmhouse-comments-form-rating-star').removeClass('active');
				$('#bmhouse-comments2 .bmhouse-comments-form-rating-star').removeClass('selected');
				$(this).addClass('selected');

				var clickedRating = $(this).data('rating');

				for (var i = 1; i <= clickedRating; i++) {
					$('#bmhouse-comments2 .bmhouse-comments-form-rating-star[data-rating="' + i + '"]').addClass('active');
				}
			}
		);



		$('#bmhouse-comments2 .bmhouse-comments-form-rating').mouseleave(
			function () {
				$('#bmhouse-comments2 .bmhouse-comments-form-rating-star').each(
					function (index, element) {
						if (!$(element).hasClass('active')) {
							$(element).css('background-position', '0 0');
						}
					}
				);

			}
		);


		$('#bmhouse-add-button').click(
			function () {
				var name = $('#bmhouse-comment-name').val();
				var rating = $('#bmhouse-comments2 .bmhouse-comments-form-rating-star.selected').data('rating');
				var text = $('#bmhouse-comment-text').val();

				var email = '';
				var phone = '';
				var advantage = '';
				var disadvantage = '';

				var imagesIds = '';

				if ($('#image_output_images img.bmhouse-comment-image').length > 0) {
					$('#image_output_images img.bmhouse-comment-image').each(
						function (index, element) {
							var imageId = $(element).data('id');

							if (imagesIds) {
								imagesIds += ',';
							}

							imagesIds += imageId;
						}
					);
				}

				var needScroll = !$(this).hasClass('with-moderation');

				var error = false;

				if (!name) {
					$('#bmhouse-comment-name').css('border-color', 'red');
					error = true;
				}

				if (!rating) {
					$('#bmhouse-comments2 .bmhouse-comments-form-rating').css('border-color', 'red');
					error = true;
				}

				if (text.length < 50) {
					$('#bmhouse-comment-text').css('border-color', 'red');
					error = true;
				}



				if ($('#bmhouse-comment-email').length) {
					email = $('#bmhouse-comment-email').val();

					if ($('#bmhouse-comment-email').hasClass('bmhouse-required') && !email) {
						$('#bmhouse-comment-email').css('border-color', 'red');
						error = true;
					}
				}

				if ($('#bmhouse-comment-phone').length) {
					phone = $('#bmhouse-comment-phone').val();

					if ($('#bmhouse-comment-phone').hasClass('bmhouse-required') && !phone) {
						$('#bmhouse-comment-phone').css('border-color', 'red');
						error = true;
					}
				}

				if ($('#bmhouse-comment-advantage').length) {
					advantage = $('#bmhouse-comment-advantage').val();

					if ($('#bmhouse-comment-advantage').hasClass('bmhouse-required') && !advantage) {
						$('#bmhouse-comment-advantage').css('border-color', 'red');
						error = true;
					}
				}

				if ($('#bmhouse-comment-disadvantage').length) {
					disadvantage = $('#bmhouse-comment-disadvantage').val();

					if ($('#bmhouse-comment-disadvantage').hasClass('bmhouse-required') && !disadvantage) {
						$('#bmhouse-comment-disadvantage').css('border-color', 'red');
						error = true;
					}
				}




				if (!error) {
					var info = $(this).parent();
					var loadingText = $(this).data('loading-text');
					var successText = $(this).data('success-text');

					info.html(loadingText);

					var url = $('#bmhouse-comment-url').val();


					$.post(
						'/bitrix/components/bmhouse/comments/ajax.php',
						{
							NAME: name,
							RATING: rating,
							TEXT: text,
							URL: url,
							IMAGES_IDS: imagesIds,
							EMAIL: email,
							PHONE: phone,
							ADVANTAGE: advantage,
							DISADVANTAGE: disadvantage,
							SIZE: $( '[name="bmhouse-comment-size"]:checked' ).val(),
						},
						function (data) {
							info.html(successText);
							info.css('color', 'green');
							info.css('font-weight', 'bold');


							var commentsBlockOffset = $('#bmhouse-comments2 .bmhouse-comments-block').offset().top - 110;

							if (needScroll) {
								$('html, body').animate(
									{
										scrollTop: commentsBlockOffset
									},
									1000
								);

								$.post(
									'',
									function (d) {
										$('.bmhouse-comments-block').html($(d).find('.bmhouse-comments-block').html());
									}
								);
							}
						}
					);
				}
			}
		);



		$('#bmhouse-comment-name, #bmhouse-comment-text, .bmhouse-required').keyup(
			function () {
				$(this).css('border-color', '#5c2c7d');
			}
		);



		$('body').on(
			'change',
			'.image_choose_input',
			function () {
				$('#bmhouse-comment-image-form').submit();
				$('#bmhouse-comment-image-form .bmhouse-comments-form-item').append('<span>' + $('#bmhouse-comment-image-form').data('loading-text') + '</span>');
			}
		);



		$('#hidden-frame').on(
			'load',
			function () {

					var pic = $('#hidden-frame').contents().find('body').html();
					if($(pic).find('img').data('id')>0) {
						$('#bmhouse-comment-image-form .bmhouse-comments-form-item span').remove();
						$('#image_output_images').append(pic);
						$('.image_choose_output').append("<span data-img='" + $(pic).find('img').data('id') + "'>" + $(pic).find('img').data('name') + "</span>");
					}

			}
		);


		$('#bmhouse-comments2').on(
			'click',
			' .bmhouse-comment-image img',
			function () {
				$(this).toggleClass('active');
			}
		);


		$('.bmhouse-comments-stat').click(
			function () {
				if (!$(this).hasClass('active')) {
					var rating = $(this).data('rating');

					$('.bmhouse-comments-stat').removeClass('active');
					$(this).addClass('active');

					$('.bmhouse-comment').addClass('hidden');
					$('.bmhouse-comment[data-rating="' + rating + '"]').removeClass('hidden');

					$('#bmhouse-comments2-show-more-comments').hide();
				}
				else {
					$('.bmhouse-comments-stat').removeClass('active');
					$('.bmhouse-comment').removeClass('hidden');

					if ($('.bmhouse-comment[data-page="2"]').length > 0) {
						$('#bmhouse-comments2-show-more-comments').show();

						$('.bmhouse-comment').addClass('hidden');
						$('.bmhouse-comment[data-page="1"]').removeClass('hidden');
					}
				}
			}
		);


		$('#bmhouse-comments2-show-more-comments').click(
			function () {
				var visibleCount = $('.bmhouse-comment:visible').length;
				var currentPage = $('.bmhouse-comment:visible').eq(visibleCount - 1).data('page');
				var nextPage = currentPage + 1;

				$('.bmhouse-comment[data-page="' + nextPage + '"]').removeClass('hidden');

				if ($('.bmhouse-comment[data-page="' + (nextPage + 1) + '"]').length == 0) {
					$(this).hide();
				}
			}
		);


		$('body').on(
			'click',
			'.bmhouse-comment-vote-up, .bmhouse-comment-vote-down',
			function () {
				if (!$(this).hasClass('disabled')) {
					var commentId = $(this).data('id');
					var vote = $(this).data('vote');

					if (commentId && vote) {
						$.post(
							'/bitrix/components/bmhouse/comments/ajax_vote.php',
							{
								COMMENT_ID: commentId,
								VOTE: vote
							}
						);

						var val = parseInt($(this).find('span').text());
						val++;
						$(this).find('span').text(val);

						$(this).parent().find('a').addClass('disabled');
					}
				}
			}
		);


		$('body').on(
			'click',
			'.bmhouse-comment-moderation a',
			function () {
				var id = $(this).data('id');
				var action = $(this).data('action');
				var confirmMessage = $(this).data('confirm-message');

				var canDo = true;
				if (action == 'DELETE') {
					canDo = confirm(confirmMessage);
				}


				if (canDo) {
					$.post(
						'/bitrix/modules/bmhouse.comments/options_ajax.php',
						{
							ID: id,
							ACTION: action
						},
						function () {
							$.post(
								'',
								function (d) {
									$('.bmhouse-comments-block').html($(d).find('.bmhouse-comments-block').html());
								}
							);
						}
					);
				}
			}
		);


		$('body').on(
			'click',
			'#bmhouse-comments2 .bmhouse-comment-answer-add a',
			function () {
				var id = $(this).data('id');
				var text = $(this).parent().find('textarea').val();

				$.post(
					'/bitrix/modules/bmhouse.comments/options_ajax.php',
					{
						ID: id,
						ACTION: 'ANSWER',
						TEXT: text
					},
					function () {
						$.post(
							'',
							function (d) {
								$('.bmhouse-comments-block').html($(d).find('.bmhouse-comments-block').html());
							}
						);
					}
				);
			}
		);
	}
);
/* End */
;
; /* Start:"a:4:{s:4:"full";s:104:"/local/templates/psk2024/components/bitrix/catalog.section/product-2slide-card/script.js?168112496244798";s:6:"source";s:88:"/local/templates/psk2024/components/bitrix/catalog.section/product-2slide-card/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
// (function (window) {
//
// if (!!window.JCCatalogSection)
// {
// 	return;
// }
//
// var BasketButton = function(params)
// {
// 	BasketButton.superclass.constructor.apply(this, arguments);
// 	this.nameNode = BX.create('span', {
// 		props : { className : 'bx_medium bx_bt_button', id : this.id },
// 		style: typeof(params.style) === 'object' ? params.style : {},
// 		text: params.text
// 	});
// 	this.buttonNode = BX.create('span', {
// 		attrs: { className: params.ownerClass },
// 		style: { marginBottom: '0', borderBottom: '0 none transparent' },
// 		children: [this.nameNode],
// 		events : this.contextEvents
// 	});
// 	if (BX.browser.IsIE())
// 	{
// 		this.buttonNode.setAttribute("hideFocus", "hidefocus");
// 	}
// };
// BX.extend(BasketButton, BX.PopupWindowButton);
//
// window.JCCatalogSection = function (arParams)
// {
// 	this.productType = 0;
// 	this.showQuantity = true;
// 	this.showAbsent = true;
// 	this.secondPict = false;
// 	this.showOldPrice = false;
// 	this.showPercent = false;
// 	this.showSkuProps = false;
// 	this.basketAction = 'ADD';
// 	this.showClosePopup = false;
// 	this.useCompare = false;
// 	this.visual = {
// 		ID: '',
// 		PICT_ID: '',
// 		SECOND_PICT_ID: '',
// 		QUANTITY_ID: '',
// 		QUANTITY_UP_ID: '',
// 		QUANTITY_DOWN_ID: '',
// 		PRICE_ID: '',
// 		DSC_PERC: '',
// 		SECOND_DSC_PERC: '',
// 		DISPLAY_PROP_DIV: '',
// 		BASKET_PROP_DIV: ''
// 	};
// 	this.product = {
// 		checkQuantity: false,
// 		maxQuantity: 0,
// 		stepQuantity: 1,
// 		isDblQuantity: false,
// 		canBuy: true,
// 		canSubscription: true,
// 		name: '',
// 		pict: {},
// 		id: 0,
// 		addUrl: '',
// 		buyUrl: ''
// 	};
//
// 	this.basketMode = '';
// 	this.basketData = {
// 		useProps: false,
// 		emptyProps: false,
// 		quantity: 'quantity',
// 		props: 'prop',
// 		basketUrl: '',
// 		sku_props: '',
// 		sku_props_var: 'basket_props',
// 		add_url: '',
// 		buy_url: ''
// 	};
//
// 	this.compareData = {
// 		compareUrl: '',
// 		comparePath: ''
// 	};
//
// 	this.defaultPict = {
// 		pict: null,
// 		secondPict: null
// 	};
//
// 	this.checkQuantity = false;
// 	this.maxQuantity = 0;
// 	this.stepQuantity = 1;
// 	this.isDblQuantity = false;
// 	this.canBuy = true;
// 	this.currentBasisPrice = {};
// 	this.canSubscription = true;
// 	this.precision = 6;
// 	this.precisionFactor = Math.pow(10,this.precision);
//
// 	this.offers = [];
// 	this.offerNum = 0;
// 	this.treeProps = [];
// 	this.obTreeRows = [];
// 	this.showCount = [];
// 	this.showStart = [];
// 	this.selectedValues = {};
//
// 	this.obProduct = null;
// 	this.obQuantity = null;
// 	this.obQuantityUp = null;
// 	this.obQuantityDown = null;
// 	this.obPict = null;
// 	this.obSecondPict = null;
// 	this.obPrice = null;
// 	this.obTree = null;
// 	this.obBuyBtn = null;
// 	this.obBasketActions = null;
// 	this.obNotAvail = null;
// 	this.obDscPerc = null;
// 	this.obSecondDscPerc = null;
// 	this.obSkuProps = null;
// 	this.obMeasure = null;
// 	this.obCompare = null;
//
// 	this.obPopupWin = null;
// 	this.basketUrl = '';
// 	this.basketParams = {};
//
// 	this.treeRowShowSize = 5;
// 	this.treeEnableArrow = { display: '', cursor: 'pointer', opacity: 1 };
// 	this.treeDisableArrow = { display: '', cursor: 'default', opacity:0.2 };
//
// 	this.lastElement = false;
// 	this.containerHeight = 0;
//
// 	this.errorCode = 0;
//
// 	if ('object' === typeof arParams)
// 	{
// 		this.productType = parseInt(arParams.PRODUCT_TYPE, 10);
// 		this.showQuantity = arParams.SHOW_QUANTITY;
// 		this.showAbsent = arParams.SHOW_ABSENT;
// 		this.secondPict = !!arParams.SECOND_PICT;
// 		this.showOldPrice = !!arParams.SHOW_OLD_PRICE;
// 		this.showPercent = !!arParams.SHOW_DISCOUNT_PERCENT;
// 		this.showSkuProps = !!arParams.SHOW_SKU_PROPS;
// 		if (!!arParams.ADD_TO_BASKET_ACTION)
// 		{
// 			this.basketAction = arParams.ADD_TO_BASKET_ACTION;
// 		}
// 		this.showClosePopup = !!arParams.SHOW_CLOSE_POPUP;
// 		this.useCompare = !!arParams.DISPLAY_COMPARE;
//
// 		this.visual = arParams.VISUAL;
//
// 		switch (this.productType)
// 		{
// 			case 0://no catalog
// 			case 1://product
// 			case 2://set
// 				if (!!arParams.PRODUCT && 'object' === typeof(arParams.PRODUCT))
// 				{
// 					if (this.showQuantity)
// 					{
// 						this.product.checkQuantity = arParams.PRODUCT.CHECK_QUANTITY;
// 						this.product.isDblQuantity = arParams.PRODUCT.QUANTITY_FLOAT;
// 						if (this.product.checkQuantity)
// 						{
// 							this.product.maxQuantity = (this.product.isDblQuantity ? parseFloat(arParams.PRODUCT.MAX_QUANTITY) : parseInt(arParams.PRODUCT.MAX_QUANTITY, 10));
// 						}
// 						this.product.stepQuantity = (this.product.isDblQuantity ? parseFloat(arParams.PRODUCT.STEP_QUANTITY) : parseInt(arParams.PRODUCT.STEP_QUANTITY, 10));
//
// 						this.checkQuantity = this.product.checkQuantity;
// 						this.isDblQuantity = this.product.isDblQuantity;
// 						this.maxQuantity = this.product.maxQuantity;
// 						this.stepQuantity = this.product.stepQuantity;
// 						if (this.isDblQuantity)
// 						{
// 							this.stepQuantity = Math.round(this.stepQuantity*this.precisionFactor)/this.precisionFactor;
// 						}
// 					}
// 					this.product.canBuy = arParams.PRODUCT.CAN_BUY;
// 					this.product.canSubscription = arParams.PRODUCT.SUBSCRIPTION;
// 					if (!!arParams.PRODUCT.BASIS_PRICE)
// 					{
// 						this.currentBasisPrice = arParams.PRODUCT.BASIS_PRICE;
// 					}
//
// 					this.canBuy = this.product.canBuy;
// 					this.canSubscription = this.product.canSubscription;
//
// 					this.product.name = arParams.PRODUCT.NAME;
// 					this.product.pict = arParams.PRODUCT.PICT;
// 					this.product.id = arParams.PRODUCT.ID;
// 					if (!!arParams.PRODUCT.ADD_URL)
// 					{
// 						this.product.addUrl = arParams.PRODUCT.ADD_URL;
// 					}
// 					if (!!arParams.PRODUCT.BUY_URL)
// 					{
// 						this.product.buyUrl = arParams.PRODUCT.BUY_URL;
// 					}
// 					if (!!arParams.BASKET && 'object' === typeof(arParams.BASKET))
// 					{
// 						this.basketData.useProps = !!arParams.BASKET.ADD_PROPS;
// 						this.basketData.emptyProps = !!arParams.BASKET.EMPTY_PROPS;
// 					}
// 				}
// 				else
// 				{
// 					this.errorCode = -1;
// 				}
// 				break;
// 			case 3://sku
// 				if (!!arParams.OFFERS && BX.type.isArray(arParams.OFFERS))
// 				{
// 					if (!!arParams.PRODUCT && 'object' === typeof(arParams.PRODUCT))
// 					{
// 						this.product.name = arParams.PRODUCT.NAME;
// 						this.product.id = arParams.PRODUCT.ID;
// 					}
// 					this.offers = arParams.OFFERS;
// 					this.offerNum = 0;
// 					if (!!arParams.OFFER_SELECTED)
// 					{
// 						this.offerNum = parseInt(arParams.OFFER_SELECTED, 10);
// 					}
// 					if (isNaN(this.offerNum))
// 					{
// 						this.offerNum = 0;
// 					}
// 					if (!!arParams.TREE_PROPS)
// 					{
// 						this.treeProps = arParams.TREE_PROPS;
// 					}
// 					if (!!arParams.DEFAULT_PICTURE)
// 					{
// 						this.defaultPict.pict = arParams.DEFAULT_PICTURE.PICTURE;
// 						this.defaultPict.secondPict = arParams.DEFAULT_PICTURE.PICTURE_SECOND;
// 					}
// 				}
// 				break;
// 			default:
// 				this.errorCode = -1;
// 		}
// 		if (!!arParams.BASKET && 'object' === typeof(arParams.BASKET))
// 		{
// 			if (!!arParams.BASKET.QUANTITY)
// 			{
// 				this.basketData.quantity = arParams.BASKET.QUANTITY;
// 			}
// 			if (!!arParams.BASKET.PROPS)
// 			{
// 				this.basketData.props = arParams.BASKET.PROPS;
// 			}
// 			if (!!arParams.BASKET.BASKET_URL)
// 			{
// 				this.basketData.basketUrl = arParams.BASKET.BASKET_URL;
// 			}
// 			if (3 === this.productType)
// 			{
// 				if (!!arParams.BASKET.SKU_PROPS)
// 				{
// 					this.basketData.sku_props = arParams.BASKET.SKU_PROPS;
// 				}
// 			}
// 			if (!!arParams.BASKET.ADD_URL_TEMPLATE)
// 			{
// 				this.basketData.add_url = arParams.BASKET.ADD_URL_TEMPLATE;
// 			}
// 			if (!!arParams.BASKET.BUY_URL_TEMPLATE)
// 			{
// 				this.basketData.buy_url = arParams.BASKET.BUY_URL_TEMPLATE;
// 			}
// 			if (this.basketData.add_url === '' && this.basketData.buy_url === '')
// 			{
// 				this.errorCode = -1024;
// 			}
// 		}
// 		if (this.useCompare)
// 		{
// 			if (!!arParams.COMPARE && typeof(arParams.COMPARE) === 'object')
// 			{
// 				if (!!arParams.COMPARE.COMPARE_PATH)
// 				{
// 					this.compareData.comparePath = arParams.COMPARE.COMPARE_PATH;
// 				}
// 				if (!!arParams.COMPARE.COMPARE_URL_TEMPLATE)
// 				{
// 					this.compareData.compareUrl = arParams.COMPARE.COMPARE_URL_TEMPLATE;
// 				}
// 				else
// 				{
// 					this.useCompare = false;
// 				}
// 			}
// 			else
// 			{
// 				this.useCompare = false;
// 			}
// 		}
//
// 		this.lastElement = (!!arParams.LAST_ELEMENT && 'Y' === arParams.LAST_ELEMENT);
// 	}
// 	if (0 === this.errorCode)
// 	{
// 		BX.ready(BX.delegate(this.Init,this));
// 	}
// };
//
// window.JCCatalogSection.prototype.Init = function()
// {
// 	var i = 0,
// 		strPrefix = '',
// 		TreeItems = null;
//
// 	this.obProduct = BX(this.visual.ID);
// 	if (!this.obProduct)
// 	{
// 		this.errorCode = -1;
// 	}
// 	this.obPict = BX(this.visual.PICT_ID);
// 	if (!this.obPict)
// 	{
// 		this.errorCode = -2;
// 	}
// 	if (this.secondPict && !!this.visual.SECOND_PICT_ID)
// 	{
// 		this.obSecondPict = BX(this.visual.SECOND_PICT_ID);
// 	}
// 	this.obPrice = BX(this.visual.PRICE_ID);
// 	if (!this.obPrice)
// 	{
// 		this.errorCode = -16;
// 	}
// 	if (this.showQuantity && !!this.visual.QUANTITY_ID)
// 	{
// 		this.obQuantity = BX(this.visual.QUANTITY_ID);
// 		if (!!this.visual.QUANTITY_UP_ID)
// 		{
// 			this.obQuantityUp = BX(this.visual.QUANTITY_UP_ID);
// 		}
// 		if (!!this.visual.QUANTITY_DOWN_ID)
// 		{
// 			this.obQuantityDown = BX(this.visual.QUANTITY_DOWN_ID);
// 		}
// 	}
// 	if (3 === this.productType && this.offers.length > 0)
// 	{
// 		if (!!this.visual.TREE_ID)
// 		{
// 			this.obTree = BX(this.visual.TREE_ID);
// 			if (!this.obTree)
// 			{
// 				this.errorCode = -256;
// 			}
// 			strPrefix = this.visual.TREE_ITEM_ID;
// 			for (i = 0; i < this.treeProps.length; i++)
// 			{
// 				this.obTreeRows[i] = {
// 					LEFT: BX(strPrefix+this.treeProps[i].ID+'_left'),
// 					RIGHT: BX(strPrefix+this.treeProps[i].ID+'_right'),
// 					LIST: BX(strPrefix+this.treeProps[i].ID+'_list'),
// 					CONT: BX(strPrefix+this.treeProps[i].ID+'_cont')
// 				};
// 				if (!this.obTreeRows[i].LEFT || !this.obTreeRows[i].RIGHT || !this.obTreeRows[i].LIST || !this.obTreeRows[i].CONT)
// 				{
// 					this.errorCode = -512;
// 					break;
// 				}
// 			}
// 		}
// 		if (!!this.visual.QUANTITY_MEASURE)
// 		{
// 			this.obMeasure = BX(this.visual.QUANTITY_MEASURE);
// 		}
// 	}
//
// 	this.obBasketActions = BX(this.visual.BASKET_ACTIONS_ID);
// 	if (!!this.obBasketActions)
// 	{
// 		if (!!this.visual.BUY_ID)
// 		{
// 			this.obBuyBtn = BX(this.visual.BUY_ID);
// 		}
// 	}
// 	this.obNotAvail = BX(this.visual.NOT_AVAILABLE_MESS);
//
// 	if (this.showPercent)
// 	{
// 		if (!!this.visual.DSC_PERC)
// 		{
// 			this.obDscPerc = BX(this.visual.DSC_PERC);
// 		}
// 		if (this.secondPict && !!this.visual.SECOND_DSC_PERC)
// 		{
// 			this.obSecondDscPerc = BX(this.visual.SECOND_DSC_PERC);
// 		}
// 	}
//
// 	if (this.showSkuProps)
// 	{
// 		if (!!this.visual.DISPLAY_PROP_DIV)
// 		{
// 			this.obSkuProps = BX(this.visual.DISPLAY_PROP_DIV);
// 		}
// 	}
//
// 	if (0 === this.errorCode)
// 	{
// 		if (this.showQuantity)
// 		{
// 			if (!!this.obQuantityUp)
// 			{
// 				BX.bind(this.obQuantityUp, 'click', BX.delegate(this.QuantityUp, this));
// 			}
// 			if (!!this.obQuantityDown)
// 			{
// 				BX.bind(this.obQuantityDown, 'click', BX.delegate(this.QuantityDown, this));
// 			}
// 			if (!!this.obQuantity)
// 			{
// 				BX.bind(this.obQuantity, 'change', BX.delegate(this.QuantityChange, this));
// 			}
// 		}
// 		switch (this.productType)
// 		{
// 			case 1://product
// 				break;
// 			case 3://sku
// 				if (this.offers.length > 0)
// 				{
// 					TreeItems = BX.findChildren(this.obTree, {tagName: 'li'}, true);
// 					if (!!TreeItems && 0 < TreeItems.length)
// 					{
// 						for (i = 0; i < TreeItems.length; i++)
// 						{
// 							BX.bind(TreeItems[i], 'click', BX.delegate(this.SelectOfferProp, this));
// 						}
// 					}
// 					for (i = 0; i < this.obTreeRows.length; i++)
// 					{
// 						BX.bind(this.obTreeRows[i].LEFT, 'click', BX.delegate(this.RowLeft, this));
// 						BX.bind(this.obTreeRows[i].RIGHT, 'click', BX.delegate(this.RowRight, this));
// 					}
// 					this.SetCurrent();
// 				}
// 				break;
// 		}
// 		if (!!this.obBuyBtn)
// 		{
// 			if (this.basketAction === 'ADD')
// 			{
// 				BX.bind(this.obBuyBtn, 'click', BX.delegate(this.Add2Basket, this));
// 			}
// 			else
// 			{
// 				BX.bind(this.obBuyBtn, 'click', BX.delegate(this.BuyBasket, this));
// 			}
// 		}
// 		if (this.lastElement)
// 		{
// 			this.containerHeight = parseInt(this.obProduct.parentNode.offsetHeight, 10);
// 			if (isNaN(this.containerHeight))
// 			{
// 				this.containerHeight = 0;
// 			}
// 			this.setHeight();
// 			BX.bind(window, 'resize', BX.delegate(this.checkHeight, this));
// 			BX.bind(this.obProduct.parentNode, 'mouseover', BX.delegate(this.setHeight, this));
// 			BX.bind(this.obProduct.parentNode, 'mouseout', BX.delegate(this.clearHeight, this));
// 		}
// 		if (this.useCompare)
// 		{
// 			this.obCompare = BX(this.visual.COMPARE_LINK_ID);
// 			if (!!this.obCompare)
// 			{
// 				BX.bind(this.obCompare, 'click', BX.proxy(this.Compare, this));
// 			}
// 		}
// 	}
// };
//
// window.JCCatalogSection.prototype.checkHeight = function()
// {
// 	this.containerHeight = parseInt(this.obProduct.parentNode.offsetHeight, 10);
// 	if (isNaN(this.containerHeight))
// 	{
// 		this.containerHeight = 0;
// 	}
// };
//
// window.JCCatalogSection.prototype.setHeight = function()
// {
// 	if (0 < this.containerHeight)
// 	{
// 		BX.adjust(this.obProduct.parentNode, {style: { height: this.containerHeight+'px'}});
// 	}
// };
//
// window.JCCatalogSection.prototype.clearHeight = function()
// {
// 	BX.adjust(this.obProduct.parentNode, {style: { height: 'auto'}});
// };
//
// window.JCCatalogSection.prototype.QuantityUp = function()
// {
// 	var curValue = 0,
// 		boolSet = true,
// 		calcPrice;
//
// 	if (0 === this.errorCode && this.showQuantity && this.canBuy)
// 	{
// 		curValue = (this.isDblQuantity ? parseFloat(this.obQuantity.value) : parseInt(this.obQuantity.value, 10));
// 		if (!isNaN(curValue))
// 		{
// 			curValue += this.stepQuantity;
// 			if (this.checkQuantity)
// 			{
// 				if (curValue > this.maxQuantity)
// 				{
// 					boolSet = false;
// 				}
// 			}
// 			if (boolSet)
// 			{
// 				if (this.isDblQuantity)
// 				{
// 					curValue = Math.round(curValue*this.precisionFactor)/this.precisionFactor;
// 				}
// 				this.obQuantity.value = curValue;
// 				calcPrice = {
// 					DISCOUNT_VALUE: this.currentBasisPrice.DISCOUNT_VALUE * curValue,
// 					VALUE: this.currentBasisPrice.VALUE * curValue,
// 					DISCOUNT_DIFF: this.currentBasisPrice.DISCOUNT_DIFF * curValue,
// 					DISCOUNT_DIFF_PERCENT: this.currentBasisPrice.DISCOUNT_DIFF_PERCENT,
// 					CURRENCY: this.currentBasisPrice.CURRENCY
// 				};
// 				this.setPrice(calcPrice);
// 			}
// 		}
// 	}
// };
//
// window.JCCatalogSection.prototype.QuantityDown = function()
// {
// 	var curValue = 0,
// 		boolSet = true,
// 		calcPrice;
//
// 	if (0 === this.errorCode && this.showQuantity && this.canBuy)
// 	{
// 		curValue = (this.isDblQuantity ? parseFloat(this.obQuantity.value): parseInt(this.obQuantity.value, 10));
// 		if (!isNaN(curValue))
// 		{
// 			curValue -= this.stepQuantity;
// 			if (curValue < this.stepQuantity)
// 			{
// 				boolSet = false;
// 			}
// 			if (boolSet)
// 			{
// 				if (this.isDblQuantity)
// 				{
// 					curValue = Math.round(curValue*this.precisionFactor)/this.precisionFactor;
// 				}
// 				this.obQuantity.value = curValue;
// 				calcPrice = {
// 					DISCOUNT_VALUE: this.currentBasisPrice.DISCOUNT_VALUE * curValue,
// 					VALUE: this.currentBasisPrice.VALUE * curValue,
// 					DISCOUNT_DIFF: this.currentBasisPrice.DISCOUNT_DIFF * curValue,
// 					DISCOUNT_DIFF_PERCENT: this.currentBasisPrice.DISCOUNT_DIFF_PERCENT,
// 					CURRENCY: this.currentBasisPrice.CURRENCY
// 				};
// 				this.setPrice(calcPrice);
// 			}
// 		}
// 	}
// };
//
// window.JCCatalogSection.prototype.QuantityChange = function()
// {
// 	var curValue = 0,
// 		calcPrice,
// 		intCount,
// 		count;
//
// 	if (0 === this.errorCode && this.showQuantity)
// 	{
// 		if (this.canBuy)
// 		{
// 			curValue = (this.isDblQuantity ? parseFloat(this.obQuantity.value) : parseInt(this.obQuantity.value, 10));
// 			if (!isNaN(curValue))
// 			{
// 				if (this.checkQuantity)
// 				{
// 					if (curValue > this.maxQuantity)
// 					{
// 						curValue = this.maxQuantity;
// 					}
// 				}
// 				if (curValue < this.stepQuantity)
// 				{
// 					curValue = this.stepQuantity;
// 				}
// 				else
// 				{
// 					count = Math.round((curValue*this.precisionFactor)/this.stepQuantity)/this.precisionFactor;
// 					intCount = parseInt(count, 10);
// 					if (isNaN(intCount))
// 					{
// 						intCount = 1;
// 						count = 1.1;
// 					}
// 					if (count > intCount)
// 					{
// 						curValue = (intCount <= 1 ? this.stepQuantity : intCount*this.stepQuantity);
// 						curValue = Math.round(curValue*this.precisionFactor)/this.precisionFactor;
// 					}
// 				}
// 				this.obQuantity.value = curValue;
// 			}
// 			else
// 			{
// 				this.obQuantity.value = this.stepQuantity;
// 			}
// 		}
// 		else
// 		{
// 			this.obQuantity.value = this.stepQuantity;
// 		}
// 		calcPrice = {
// 			DISCOUNT_VALUE: this.currentBasisPrice.DISCOUNT_VALUE * this.obQuantity.value,
// 			VALUE: this.currentBasisPrice.VALUE * this.obQuantity.value,
// 			DISCOUNT_DIFF: this.currentBasisPrice.DISCOUNT_DIFF * this.obQuantity.value,
// 			DISCOUNT_DIFF_PERCENT: this.currentBasisPrice.DISCOUNT_DIFF_PERCENT,
// 			CURRENCY: this.currentBasisPrice.CURRENCY
// 		};
// 		this.setPrice(calcPrice);
// 	}
// };
//
// window.JCCatalogSection.prototype.QuantitySet = function(index)
// {
// 	if (0 === this.errorCode)
// 	{
// 		this.canBuy = this.offers[index].CAN_BUY;
// 		if (this.canBuy)
// 		{
// 			if (!!this.obBasketActions)
// 			{
// 				BX.style(this.obBasketActions, 'display', '');
// 			}
// 			if (!!this.obNotAvail)
// 			{
// 				BX.style(this.obNotAvail, 'display', 'none');
// 			}
// 		}
// 		else
// 		{
// 			if (!!this.obBasketActions)
// 			{
// 				BX.style(this.obBasketActions, 'display', 'none');
// 			}
// 			if (!!this.obNotAvail)
// 			{
// 				BX.style(this.obNotAvail, 'display', '');
// 			}
// 		}
// 		if (this.showQuantity)
// 		{
// 			this.isDblQuantity = this.offers[index].QUANTITY_FLOAT;
// 			this.checkQuantity = this.offers[index].CHECK_QUANTITY;
// 			if (this.isDblQuantity)
// 			{
// 				this.maxQuantity = parseFloat(this.offers[index].MAX_QUANTITY);
// 				this.stepQuantity = Math.round(parseFloat(this.offers[index].STEP_QUANTITY)*this.precisionFactor)/this.precisionFactor;
// 			}
// 			else
// 			{
// 				this.maxQuantity = parseInt(this.offers[index].MAX_QUANTITY, 10);
// 				this.stepQuantity = parseInt(this.offers[index].STEP_QUANTITY, 10);
// 			}
//
// 			this.obQuantity.value = this.stepQuantity;
// 			this.obQuantity.disabled = !this.canBuy;
// 			if (!!this.obMeasure)
// 			{
// 				if (!!this.offers[index].MEASURE)
// 				{
// 					BX.adjust(this.obMeasure, { html : this.offers[index].MEASURE});
// 				}
// 				else
// 				{
// 					BX.adjust(this.obMeasure, { html : ''});
// 				}
// 			}
// 		}
// 		this.currentBasisPrice = this.offers[index].BASIS_PRICE;
// 	}
// };
//
// window.JCCatalogSection.prototype.SelectOfferProp = function()
// {
// 	var i = 0,
// 		value = '',
// 		strTreeValue = '',
// 		arTreeItem = [],
// 		RowItems = null,
// 		target = BX.proxy_context;
//
// 	if (!!target && target.hasAttribute('data-treevalue'))
// 	{
// 		strTreeValue = target.getAttribute('data-treevalue');
// 		arTreeItem = strTreeValue.split('_');
// 		if (this.SearchOfferPropIndex(arTreeItem[0], arTreeItem[1]))
// 		{
// 			RowItems = BX.findChildren(target.parentNode, {tagName: 'li'}, false);
// 			if (!!RowItems && 0 < RowItems.length)
// 			{
// 				for (i = 0; i < RowItems.length; i++)
// 				{
// 					value = RowItems[i].getAttribute('data-onevalue');
// 					if (value === arTreeItem[1])
// 					{
// 						BX.addClass(RowItems[i], 'bx_active');
// 					}
// 					else
// 					{
// 						BX.removeClass(RowItems[i], 'bx_active');
// 					}
// 				}
// 			}
// 		}
// 	}
// };
//
// window.JCCatalogSection.prototype.SearchOfferPropIndex = function(strPropID, strPropValue)
// {
// 	var strName = '',
// 		arShowValues = false,
// 		i, j,
// 		arCanBuyValues = [],
// 		allValues = [],
// 		index = -1,
// 		arFilter = {},
// 		tmpFilter = [];
//
// 	for (i = 0; i < this.treeProps.length; i++)
// 	{
// 		if (this.treeProps[i].ID === strPropID)
// 		{
// 			index = i;
// 			break;
// 		}
// 	}
//
// 	if (-1 < index)
// 	{
// 		for (i = 0; i < index; i++)
// 		{
// 			strName = 'PROP_'+this.treeProps[i].ID;
// 			arFilter[strName] = this.selectedValues[strName];
// 		}
// 		strName = 'PROP_'+this.treeProps[index].ID;
// 		arShowValues = this.GetRowValues(arFilter, strName);
// 		if (!arShowValues)
// 		{
// 			return false;
// 		}
// 		if (!BX.util.in_array(strPropValue, arShowValues))
// 		{
// 			return false;
// 		}
// 		arFilter[strName] = strPropValue;
// 		for (i = index+1; i < this.treeProps.length; i++)
// 		{
// 			strName = 'PROP_'+this.treeProps[i].ID;
// 			arShowValues = this.GetRowValues(arFilter, strName);
// 			if (!arShowValues)
// 			{
// 				return false;
// 			}
// 			allValues = [];
// 			if (this.showAbsent)
// 			{
// 				arCanBuyValues = [];
// 				tmpFilter = [];
// 				tmpFilter = BX.clone(arFilter, true);
// 				for (j = 0; j < arShowValues.length; j++)
// 				{
// 					tmpFilter[strName] = arShowValues[j];
// 					allValues[allValues.length] = arShowValues[j];
// 					if (this.GetCanBuy(tmpFilter))
// 						arCanBuyValues[arCanBuyValues.length] = arShowValues[j];
// 				}
// 			}
// 			else
// 			{
// 				arCanBuyValues = arShowValues;
// 			}
// 			if (!!this.selectedValues[strName] && BX.util.in_array(this.selectedValues[strName], arCanBuyValues))
// 			{
// 				arFilter[strName] = this.selectedValues[strName];
// 			}
// 			else
// 			{
// 				if (this.showAbsent)
// 					arFilter[strName] = (arCanBuyValues.length > 0 ? arCanBuyValues[0] : allValues[0]);
// 				else
// 					arFilter[strName] = arCanBuyValues[0];
// 			}
// 			this.UpdateRow(i, arFilter[strName], arShowValues, arCanBuyValues);
// 		}
// 		this.selectedValues = arFilter;
// 		this.ChangeInfo();
// 	}
// 	return true;
// };
//
// window.JCCatalogSection.prototype.RowLeft = function()
// {
// 	var i = 0,
// 		strTreeValue = '',
// 		index = -1,
// 		target = BX.proxy_context;
//
// 	if (!!target && target.hasAttribute('data-treevalue'))
// 	{
// 		strTreeValue = target.getAttribute('data-treevalue');
// 		for (i = 0; i < this.treeProps.length; i++)
// 		{
// 			if (this.treeProps[i].ID === strTreeValue)
// 			{
// 				index = i;
// 				break;
// 			}
// 		}
// 		if (-1 < index && this.treeRowShowSize < this.showCount[index])
// 		{
// 			if (0 > this.showStart[index])
// 			{
// 				this.showStart[index]++;
// 				BX.adjust(this.obTreeRows[index].LIST, { style: { marginLeft: this.showStart[index]*20+'%' }});
// 				BX.adjust(this.obTreeRows[index].RIGHT, { style: this.treeEnableArrow });
// 			}
//
// 			if (0 <= this.showStart[index])
// 			{
// 				BX.adjust(this.obTreeRows[index].LEFT, { style: this.treeDisableArrow });
// 			}
// 		}
// 	}
// };
//
// window.JCCatalogSection.prototype.RowRight = function()
// {
// 	var i = 0,
// 		strTreeValue = '',
// 		index = -1,
// 		target = BX.proxy_context;
//
// 	if (!!target && target.hasAttribute('data-treevalue'))
// 	{
// 		strTreeValue = target.getAttribute('data-treevalue');
// 		for (i = 0; i < this.treeProps.length; i++)
// 		{
// 			if (this.treeProps[i].ID === strTreeValue)
// 			{
// 				index = i;
// 				break;
// 			}
// 		}
// 		if (-1 < index && this.treeRowShowSize < this.showCount[index])
// 		{
// 			if ((this.treeRowShowSize - this.showStart[index]) < this.showCount[index])
// 			{
// 				this.showStart[index]--;
// 				BX.adjust(this.obTreeRows[index].LIST, { style: { marginLeft: this.showStart[index]*20+'%' }});
// 				BX.adjust(this.obTreeRows[index].LEFT, { style: this.treeEnableArrow });
// 			}
//
// 			if ((this.treeRowShowSize - this.showStart[index]) >= this.showCount[index])
// 			{
// 				BX.adjust(this.obTreeRows[index].RIGHT, { style: this.treeDisableArrow });
// 			}
// 		}
// 	}
// };
//
// window.JCCatalogSection.prototype.UpdateRow = function(intNumber, activeID, showID, canBuyID)
// {
// 	var i = 0,
// 		showI = 0,
// 		value = '',
// 		countShow = 0,
// 		strNewLen = '',
// 		obData = {},
// 		pictMode = false,
// 		extShowMode = false,
// 		isCurrent = false,
// 		selectIndex = 0,
// 		obLeft = this.treeEnableArrow,
// 		obRight = this.treeEnableArrow,
// 		currentShowStart = 0,
// 		RowItems = null;
//
// 	if (-1 < intNumber && intNumber < this.obTreeRows.length)
// 	{
// 		RowItems = BX.findChildren(this.obTreeRows[intNumber].LIST, {tagName: 'li'}, false);
// 		if (!!RowItems && 0 < RowItems.length)
// 		{
// 			pictMode = ('PICT' === this.treeProps[intNumber].SHOW_MODE);
// 			countShow = showID.length;
// 			extShowMode = this.treeRowShowSize < countShow;
// 			strNewLen = (extShowMode ? (100/countShow)+'%' : '20%');
// 			obData = {
// 				props: { className: '' },
// 				style: {
// 					width: strNewLen
// 				}
// 			};
// 			if (pictMode)
// 			{
// 				obData.style.paddingTop = strNewLen;
// 			}
// 			for (i = 0; i < RowItems.length; i++)
// 			{
// 				value = RowItems[i].getAttribute('data-onevalue');
// 				isCurrent = (value === activeID);
// 				if (BX.util.in_array(value, canBuyID))
// 				{
// 					obData.props.className = (isCurrent ? 'bx_active' : '');
// 				}
// 				else
// 				{
// 					obData.props.className = (isCurrent ? 'bx_active bx_missing' : 'bx_missing');
// 				}
// 				obData.style.display = 'none';
// 				if (BX.util.in_array(value, showID))
// 				{
// 					obData.style.display = '';
// 					if (isCurrent)
// 					{
// 						selectIndex = showI;
// 					}
// 					showI++;
// 				}
// 				BX.adjust(RowItems[i], obData);
// 			}
//
// 			obData = {
// 				style: {
// 					width: (extShowMode ? 20*countShow : 100)+'%',
// 					marginLeft: '0%'
// 				}
// 			};
// 			if (pictMode)
// 			{
// 				BX.adjust(this.obTreeRows[intNumber].CONT, {props: {className: (extShowMode ? 'bx_item_detail_scu full' : 'bx_item_detail_scu')}});
// 			}
// 			else
// 			{
// 				BX.adjust(this.obTreeRows[intNumber].CONT, {props: {className: (extShowMode ? 'bx_item_detail_size full' : 'bx_item_detail_size')}});
// 			}
// 			if (extShowMode)
// 			{
// 				if (selectIndex +1 === countShow)
// 				{
// 					obRight = this.treeDisableArrow;
// 				}
// 				if (this.treeRowShowSize <= selectIndex)
// 				{
// 					currentShowStart = this.treeRowShowSize - selectIndex - 1;
// 					obData.style.marginLeft = currentShowStart*20+'%';
// 				}
// 				if (0 === currentShowStart)
// 				{
// 					obLeft = this.treeDisableArrow;
// 				}
// 				BX.adjust(this.obTreeRows[intNumber].LEFT, {style: obLeft });
// 				BX.adjust(this.obTreeRows[intNumber].RIGHT, {style: obRight });
// 			}
// 			else
// 			{
// 				BX.adjust(this.obTreeRows[intNumber].LEFT, {style: {display: 'none'}});
// 				BX.adjust(this.obTreeRows[intNumber].RIGHT, {style: {display: 'none'}});
// 			}
// 			BX.adjust(this.obTreeRows[intNumber].LIST, obData);
// 			this.showCount[intNumber] = countShow;
// 			this.showStart[intNumber] = currentShowStart;
// 		}
// 	}
// };
//
// window.JCCatalogSection.prototype.GetRowValues = function(arFilter, index)
// {
// 	var i = 0,
// 		j,
// 		arValues = [],
// 		boolSearch = false,
// 		boolOneSearch = true;
//
// 	if (0 === arFilter.length)
// 	{
// 		for (i = 0; i < this.offers.length; i++)
// 		{
// 			if (!BX.util.in_array(this.offers[i].TREE[index], arValues))
// 			{
// 				arValues[arValues.length] = this.offers[i].TREE[index];
// 			}
// 		}
// 		boolSearch = true;
// 	}
// 	else
// 	{
// 		for (i = 0; i < this.offers.length; i++)
// 		{
// 			boolOneSearch = true;
// 			for (j in arFilter)
// 			{
// 				if (arFilter[j] !== this.offers[i].TREE[j])
// 				{
// 					boolOneSearch = false;
// 					break;
// 				}
// 			}
// 			if (boolOneSearch)
// 			{
// 				if (!BX.util.in_array(this.offers[i].TREE[index], arValues))
// 				{
// 					arValues[arValues.length] = this.offers[i].TREE[index];
// 				}
// 				boolSearch = true;
// 			}
// 		}
// 	}
// 	return (boolSearch ? arValues : false);
// };
//
// window.JCCatalogSection.prototype.GetCanBuy = function(arFilter)
// {
// 	var i = 0,
// 		j,
// 		boolSearch = false,
// 		boolOneSearch = true;
//
// 	for (i = 0; i < this.offers.length; i++)
// 	{
// 		boolOneSearch = true;
// 		for (j in arFilter)
// 		{
// 			if (arFilter[j] !== this.offers[i].TREE[j])
// 			{
// 				boolOneSearch = false;
// 				break;
// 			}
// 		}
// 		if (boolOneSearch)
// 		{
// 			if (this.offers[i].CAN_BUY)
// 			{
// 				boolSearch = true;
// 				break;
// 			}
// 		}
// 	}
// 	return boolSearch;
// };
//
// window.JCCatalogSection.prototype.SetCurrent = function()
// {
// 	var i = 0,
// 		j = 0,
// 		arCanBuyValues = [],
// 		strName = '',
// 		arShowValues = false,
// 		arFilter = {},
// 		tmpFilter = [],
// 		current = this.offers[this.offerNum].TREE;
//
// 	for (i = 0; i < this.treeProps.length; i++)
// 	{
// 		strName = 'PROP_'+this.treeProps[i].ID;
// 		arShowValues = this.GetRowValues(arFilter, strName);
// 		if (!arShowValues)
// 		{
// 			break;
// 		}
// 		if (BX.util.in_array(current[strName], arShowValues))
// 		{
// 			arFilter[strName] = current[strName];
// 		}
// 		else
// 		{
// 			arFilter[strName] = arShowValues[0];
// 			this.offerNum = 0;
// 		}
// 		if (this.showAbsent)
// 		{
// 			arCanBuyValues = [];
// 			tmpFilter = [];
// 			tmpFilter = BX.clone(arFilter, true);
// 			for (j = 0; j < arShowValues.length; j++)
// 			{
// 				tmpFilter[strName] = arShowValues[j];
// 				if (this.GetCanBuy(tmpFilter))
// 				{
// 					arCanBuyValues[arCanBuyValues.length] = arShowValues[j];
// 				}
// 			}
// 		}
// 		else
// 		{
// 			arCanBuyValues = arShowValues;
// 		}
// 		this.UpdateRow(i, arFilter[strName], arShowValues, arCanBuyValues);
// 	}
// 	this.selectedValues = arFilter;
// 	this.ChangeInfo();
// };
//
// window.JCCatalogSection.prototype.ChangeInfo = function()
// {
// 	var i = 0,
// 		j,
// 		index = -1,
// 		boolOneSearch = true;
//
// 	for (i = 0; i < this.offers.length; i++)
// 	{
// 		boolOneSearch = true;
// 		for (j in this.selectedValues)
// 		{
// 			if (this.selectedValues[j] !== this.offers[i].TREE[j])
// 			{
// 				boolOneSearch = false;
// 				break;
// 			}
// 		}
// 		if (boolOneSearch)
// 		{
// 			index = i;
// 			break;
// 		}
// 	}
// 	if (-1 < index)
// 	{
// 		if (!!this.obPict)
// 		{
// 			if (!!this.offers[index].PREVIEW_PICTURE)
// 			{
// 				BX.adjust(this.obPict, {style: {backgroundImage: 'url('+this.offers[index].PREVIEW_PICTURE.SRC+')'}});
// 			}
// 			else
// 			{
// 				BX.adjust(this.obPict, {style: {backgroundImage: 'url('+this.defaultPict.pict.SRC+')'}});
// 			}
// 		}
// 		if (this.secondPict && !!this.obSecondPict)
// 		{
// 			if (!!this.offers[index].PREVIEW_PICTURE_SECOND)
// 			{
// 				BX.adjust(this.obSecondPict, {style: {backgroundImage: 'url('+this.offers[index].PREVIEW_PICTURE_SECOND.SRC+')'}});
// 			}
// 			else if (!!this.offers[index].PREVIEW_PICTURE.SRC)
// 			{
// 				BX.adjust(this.obSecondPict, {style: {backgroundImage: 'url('+this.offers[index].PREVIEW_PICTURE.SRC+')'}});
// 			}
// 			else if (!!this.defaultPict.secondPict)
// 			{
// 				BX.adjust(this.obSecondPict, {style: {backgroundImage: 'url('+this.defaultPict.secondPict.SRC+')'}});
// 			}
// 			else
// 			{
// 				BX.adjust(this.obSecondPict, {style: {backgroundImage: 'url('+this.defaultPict.pict.SRC+')'}});
// 			}
// 		}
// 		if (this.showSkuProps && !!this.obSkuProps)
// 		{
// 			if (0 === this.offers[index].DISPLAY_PROPERTIES.length)
// 			{
// 				BX.adjust(this.obSkuProps, {style: {display: 'none'}, html: ''});
// 			}
// 			else
// 			{
// 				BX.adjust(this.obSkuProps, {style: {display: ''}, html: this.offers[index].DISPLAY_PROPERTIES});
// 			}
// 		}
// 		this.setPrice(this.offers[index].PRICE);
// 		this.offerNum = index;
// 		this.QuantitySet(this.offerNum);
// 	}
// };
//
// window.JCCatalogSection.prototype.setPrice = function(price)
// {
// 	var strPrice,
// 		obData;
//
// 	if (!!this.obPrice)
// 	{
// 		strPrice = BX.Currency.currencyFormat(price.DISCOUNT_VALUE, price.CURRENCY, true);
// 		if (this.showOldPrice && (price.DISCOUNT_VALUE !== price.VALUE))
// 		{
// 			strPrice += ' <span>'+BX.Currency.currencyFormat(price.VALUE, price.CURRENCY, true)+'</span>';
// 		}
// 		BX.adjust(this.obPrice, {html: strPrice});
// 		if (this.showPercent)
// 		{
// 			if (price.DISCOUNT_VALUE !== price.VALUE)
// 			{
// 				obData = {
// 					style: {
// 						display: ''
// 					},
// 					html: price.DISCOUNT_DIFF_PERCENT
// 				};
// 			}
// 			else
// 			{
// 				obData = {
// 					style: {
// 						display: 'none'
// 					},
// 					html: ''
// 				};
// 			}
// 			if (!!this.obDscPerc)
// 			{
// 				BX.adjust(this.obDscPerc, obData);
// 			}
// 			if (!!this.obSecondDscPerc)
// 			{
// 				BX.adjust(this.obSecondDscPerc, obData);
// 			}
// 		}
// 	}
// };
//
// window.JCCatalogSection.prototype.Compare = function()
// {
// 	var compareParams, compareLink;
// 	if (!!this.compareData.compareUrl)
// 	{
// 		switch (this.productType)
// 		{
// 			case 0://no catalog
// 			case 1://product
// 			case 2://set
// 				compareLink = this.compareData.compareUrl.replace('#ID#', this.product.id.toString());
// 				break;
// 			case 3://sku
// 				compareLink = this.compareData.compareUrl.replace('#ID#', this.offers[this.offerNum].ID);
// 				break;
// 		}
// 		compareParams = {
// 			ajax_action: 'Y'
// 		};
// 		BX.ajax.loadJSON(
// 			compareLink,
// 			compareParams,
// 			BX.proxy(this.CompareResult, this)
// 		);
// 	}
// };
//
// window.JCCatalogSection.prototype.CompareResult = function(result)
// {
// 	var popupContent, popupButtons, popupTitle;
// 	if (!!this.obPopupWin)
// 	{
// 		this.obPopupWin.close();
// 	}
// 	if (typeof result !== 'object')
// 	{
// 		return false;
// 	}
// 	this.InitPopupWindow();
// 	popupTitle = {
// 		content: BX.create('div', {
// 			style: { marginRight: '30px', whiteSpace: 'nowrap' },
// 			text: BX.message('COMPARE_TITLE')
// 		})
// 	};
// 	if (result.STATUS === 'OK')
// 	{
// 		BX.onCustomEvent('OnCompareChange');
// 		popupContent = '<div style="width: 96%; margin: 10px 2%; text-align: center;"><p>'+BX.message('COMPARE_MESSAGE_OK')+'</p></div>';
// 		if (this.showClosePopup)
// 		{
// 			popupButtons = [
// 				new BasketButton({
// 					ownerClass: this.obProduct.parentNode.parentNode.className,
// 					text: BX.message('BTN_MESSAGE_COMPARE_REDIRECT'),
// 					events: {
// 						click: BX.delegate(this.CompareRedirect, this)
// 					},
// 					style: {marginRight: '10px'}
// 				}),
// 				new BasketButton({
// 					ownerClass: this.obProduct.parentNode.parentNode.className,
// 					text: BX.message('BTN_MESSAGE_CLOSE_POPUP'),
// 					events: {
// 						click: BX.delegate(this.obPopupWin.close, this.obPopupWin)
// 					}
// 				})
// 			];
// 		}
// 		else
// 		{
// 			popupButtons = [
// 				new BasketButton({
// 					ownerClass: this.obProduct.parentNode.parentNode.className,
// 					text: BX.message('BTN_MESSAGE_COMPARE_REDIRECT'),
// 					events: {
// 						click: BX.delegate(this.CompareRedirect, this)
// 					}
// 				})
// 			];
// 		}
// 	}
// 	else
// 	{
// 		popupContent = '<div style="width: 96%; margin: 10px 2%; text-align: center;"><p>'+(!!result.MESSAGE ? result.MESSAGE : BX.message('COMPARE_UNKNOWN_ERROR'))+'</p></div>';
// 		popupButtons = [
// 			new BasketButton({
// 				ownerClass: this.obProduct.parentNode.parentNode.className,
// 				text: BX.message('BTN_MESSAGE_CLOSE'),
// 				events: {
// 					click: BX.delegate(this.obPopupWin.close, this.obPopupWin)
// 				}
//
// 			})
// 		];
// 	}
// 	this.obPopupWin.setTitleBar(popupTitle);
// 	this.obPopupWin.setContent(popupContent);
// 	this.obPopupWin.setButtons(popupButtons);
// 	this.obPopupWin.show();
// 	return false;
// };
//
// window.JCCatalogSection.prototype.CompareRedirect = function()
// {
// 	if (!!this.compareData.comparePath)
// 	{
// 		location.href = this.compareData.comparePath;
// 	}
// 	else
// 	{
// 		this.obPopupWin.close();
// 	}
// };
//
// window.JCCatalogSection.prototype.InitBasketUrl = function()
// {
// 	this.basketUrl = (this.basketMode === 'ADD' ? this.basketData.add_url : this.basketData.buy_url);
// 	switch (this.productType)
// 	{
// 		case 1://product
// 		case 2://set
// 			this.basketUrl = this.basketUrl.replace('#ID#', this.product.id.toString());
// 			break;
// 		case 3://sku
// 			this.basketUrl = this.basketUrl.replace('#ID#', this.offers[this.offerNum].ID);
// 			break;
// 	}
// 	this.basketParams = {
// 		'ajax_basket': 'Y'
// 	};
// 	if (this.showQuantity)
// 	{
// 		this.basketParams[this.basketData.quantity] = this.obQuantity.value;
// 	}
// 	if (!!this.basketData.sku_props)
// 	{
// 		this.basketParams[this.basketData.sku_props_var] = this.basketData.sku_props;
// 	}
// };
//
// window.JCCatalogSection.prototype.FillBasketProps = function()
// {
// 	if (!this.visual.BASKET_PROP_DIV)
// 	{
// 		return;
// 	}
// 	var
// 		i = 0,
// 		propCollection = null,
// 		foundValues = false,
// 		obBasketProps = null;
//
// 	if (this.basketData.useProps && !this.basketData.emptyProps)
// 	{
// 		if (!!this.obPopupWin && !!this.obPopupWin.contentContainer)
// 		{
// 			obBasketProps = this.obPopupWin.contentContainer;
// 		}
// 	}
// 	else
// 	{
// 		obBasketProps = BX(this.visual.BASKET_PROP_DIV);
// 	}
// 	if (!!obBasketProps)
// 	{
// 		propCollection = obBasketProps.getElementsByTagName('select');
// 		if (!!propCollection && !!propCollection.length)
// 		{
// 			for (i = 0; i < propCollection.length; i++)
// 			{
// 				if (!propCollection[i].disabled)
// 				{
// 					switch(propCollection[i].type.toLowerCase())
// 					{
// 						case 'select-one':
// 							this.basketParams[propCollection[i].name] = propCollection[i].value;
// 							foundValues = true;
// 							break;
// 						default:
// 							break;
// 					}
// 				}
// 			}
// 		}
// 		propCollection = obBasketProps.getElementsByTagName('input');
// 		if (!!propCollection && !!propCollection.length)
// 		{
// 			for (i = 0; i < propCollection.length; i++)
// 			{
// 				if (!propCollection[i].disabled)
// 				{
// 					switch(propCollection[i].type.toLowerCase())
// 					{
// 						case 'hidden':
// 							this.basketParams[propCollection[i].name] = propCollection[i].value;
// 							foundValues = true;
// 							break;
// 						case 'radio':
// 							if (propCollection[i].checked)
// 							{
// 								this.basketParams[propCollection[i].name] = propCollection[i].value;
// 								foundValues = true;
// 							}
// 							break;
// 						default:
// 							break;
// 					}
// 				}
// 			}
// 		}
// 	}
// 	if (!foundValues)
// 	{
// 		this.basketParams[this.basketData.props] = [];
// 		this.basketParams[this.basketData.props][0] = 0;
// 	}
// };
//
// window.JCCatalogSection.prototype.Add2Basket = function()
// {
// 	this.basketMode = 'ADD';
// 	this.Basket();
// };
//
// window.JCCatalogSection.prototype.BuyBasket = function()
// {
// 	this.basketMode = 'BUY';
// 	this.Basket();
// };
//
// window.JCCatalogSection.prototype.SendToBasket = function()
// {
// 	if (!this.canBuy)
// 	{
// 		return;
// 	}
// 	this.InitBasketUrl();
// 	this.FillBasketProps();
// 	BX.ajax.loadJSON(
// 		this.basketUrl,
// 		this.basketParams,
// 		BX.delegate(this.BasketResult, this)
// 	);
// };
//
// window.JCCatalogSection.prototype.Basket = function()
// {
// 	var contentBasketProps = '';
// 	if (!this.canBuy)
// 	{
// 		return;
// 	}
// 	switch (this.productType)
// 	{
// 	case 1://product
// 	case 2://set
// 		if (this.basketData.useProps && !this.basketData.emptyProps)
// 		{
// 			this.InitPopupWindow();
// 			this.obPopupWin.setTitleBar({
// 				content: BX.create('div', {
// 					style: { marginRight: '30px', whiteSpace: 'nowrap' },
// 					text: BX.message('TITLE_BASKET_PROPS')
// 				})
// 			});
// 			if (BX(this.visual.BASKET_PROP_DIV))
// 			{
// 				contentBasketProps = BX(this.visual.BASKET_PROP_DIV).innerHTML;
// 			}
// 			this.obPopupWin.setContent(contentBasketProps);
// 			this.obPopupWin.setButtons([
// 				new BasketButton({
// 					ownerClass: this.obProduct.parentNode.parentNode.className,
// 					text: BX.message('BTN_MESSAGE_SEND_PROPS'),
// 					events: {
// 						click: BX.delegate(this.SendToBasket, this)
// 					}
// 				})
// 			]);
// 			this.obPopupWin.show();
// 		}
// 		else
// 		{
// 			this.SendToBasket();
// 		}
// 		break;
// 	case 3://sku
// 		this.SendToBasket();
// 		break;
// 	}
// };
//
// window.JCCatalogSection.prototype.BasketResult = function(arResult)
// {
// 	var strContent = '',
// 		strPict = '',
// 		successful,
// 		buttons = [];
//
// 	if (!!this.obPopupWin)
// 	{
// 		this.obPopupWin.close();
// 	}
// 	if ('object' !== typeof arResult)
// 	{
// 		return false;
// 	}
// 	successful = (arResult.STATUS === 'OK');
// 	if (successful && this.basketAction === 'BUY')
// 	{
// 		this.BasketRedirect();
// 	}
// 	else
// 	{
// 		this.InitPopupWindow();
// 		if (successful)
// 		{
// 			BX.onCustomEvent('OnBasketChange');
// 			switch(this.productType)
// 			{
// 			case 1://
// 			case 2://
// 				strPict = this.product.pict.SRC;
// 				break;
// 			case 3:
// 				strPict = (!!this.offers[this.offerNum].PREVIEW_PICTURE ?
// 					this.offers[this.offerNum].PREVIEW_PICTURE.SRC :
// 					this.defaultPict.pict.SRC
// 				);
// 				break;
// 			}
// 			strContent = '<div style="width: 96%; margin: 10px 2%; text-align: center;"><img src="'+strPict+'" height="130" style="max-height:130px"><p>'+this.product.name+'</p></div>';
// 			if (this.showClosePopup)
// 			{
// 				buttons = [
// 					new BasketButton({
// 						ownerClass: this.obProduct.parentNode.parentNode.className,
// 						text: BX.message("BTN_MESSAGE_BASKET_REDIRECT"),
// 						events: {
// 							click: BX.delegate(this.BasketRedirect, this)
// 						},
// 						style: {marginRight: '10px'}
// 					}),
// 					new BasketButton({
// 						ownerClass: this.obProduct.parentNode.parentNode.className,
// 						text: BX.message("BTN_MESSAGE_CLOSE_POPUP"),
// 						events: {
// 							click: BX.delegate(this.obPopupWin.close, this.obPopupWin)
// 						}
// 					})
// 				];
// 			}
// 			else
// 			{
// 				buttons = [
// 					new BasketButton({
// 						ownerClass: this.obProduct.parentNode.parentNode.className,
// 						text: BX.message("BTN_MESSAGE_BASKET_REDIRECT"),
// 						events: {
// 							click: BX.delegate(this.BasketRedirect, this)
// 						}
// 					})
// 				];
// 			}
// 		}
// 		else
// 		{
// 			strContent = '<div style="width: 96%; margin: 10px 2%; text-align: center;"><p>'+(!!arResult.MESSAGE ? arResult.MESSAGE : BX.message('BASKET_UNKNOWN_ERROR'))+'</p></div>';
// 			buttons = [
// 				new BasketButton({
// 					ownerClass: this.obProduct.parentNode.parentNode.className,
// 					text: BX.message('BTN_MESSAGE_CLOSE'),
// 					events: {
// 						click: BX.delegate(this.obPopupWin.close, this.obPopupWin)
// 					}
// 				})
// 			];
// 		}
// 		this.obPopupWin.setTitleBar({
// 			content: BX.create('div', {
// 				style: { marginRight: '30px', whiteSpace: 'nowrap' },
// 				text: (successful ? BX.message('TITLE_SUCCESSFUL') : BX.message('TITLE_ERROR'))
// 			})
// 		});
// 		this.obPopupWin.setContent(strContent);
// 		this.obPopupWin.setButtons(buttons);
// 		this.obPopupWin.show();
// 	}
// };
//
// window.JCCatalogSection.prototype.BasketRedirect = function()
// {
// 	location.href = (!!this.basketData.basketUrl ? this.basketData.basketUrl : BX.message('BASKET_URL'));
// };
//
// window.JCCatalogSection.prototype.InitPopupWindow = function()
// {
// 	if (!!this.obPopupWin)
// 	{
// 		return;
// 	}
// 	this.obPopupWin = BX.PopupWindowManager.create('CatalogSectionBasket_'+this.visual.ID, null, {
// 		autoHide: false,
// 		offsetLeft: 0,
// 		offsetTop: 0,
// 		overlay : true,
// 		closeByEsc: true,
// 		titleBar: true,
// 		closeIcon: {top: '10px', right: '10px'}
// 	});
// };
// })(window);
/* End */
;; /* /local/templates/psk2024/js/compiled/filter.min.js?175223829319326*/
; /* /local/templates/psk2024/components/bitrix/catalog/main/script.js?16823291941174*/
; /* /local/templates/psk2024/components/bitrix/catalog/main/bitrix/catalog.element/.default/script.js?17219001709031*/
; /* /local/templates/psk2024/components/bmhouse/comments/detail_product/script.js?16617949809384*/
; /* /local/templates/psk2024/components/bitrix/catalog.section/product-2slide-card/script.js?168112496244798*/

