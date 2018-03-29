var cpTemplates = angular.module('cp.templates', []);
cpTemplates.run(['$templateCache', function ($templateCache) {
    //input field template
    $templateCache.put("input-field.html", "<input class='form-control' />");
    //radio button and goup template
    $templateCache.put('radio-template.html', '<div class="form-group"><label class="radio-label">{{label}}</label><div><div class="radio {{cpClass}}"  ng-repeat="(key, value) in radioItems"><input id="radio{{$index}}" type="radio" ng-model=$parent.radioModel ng-value={{radiovalue}} ng-disabled=ngDisabled ng-required="ngRequired"><label for="radio{{$index}}"> {{value}}  </label> </div></div> </div>');
    //button template
    $templateCache.put('button-template.html', '<button ng-transclude></button>');
    $templateCache.put('cp-leftnavigation.html', '<ul><li data-ng-repeat="navItem in navigationModel"> {{navItem.item}}<ul data-ng-if="navItem.subItems"><li data-ng-repeat="subItem in navItem.subItems">{{subItem.item}}</li></ul></li></ul>');
   
    $templateCache.put("icon-template.html", "<i class=\"icon-size\" ng-style=\"{&quot;font-size&quot;: inherit}\"></i>");

    $templateCache.put("master-head-tempalate.html", '<nav class="master-header"><div class="navbar navbar-default navbar-fixed-top cpc-navbar"><div class="container-fluid"><div class="navbar-header"><button type="button"class="navbar-toggle collapsed" data-toggle="collapse"  data-target="#masterNavigation" aria-expanded="false"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><div class="brand-navbar" ng-class=\'{"visible-mega-menu":isShowMegaMenu}\'><div class="brand-header"><div class="pull-left masterhead-logo"> <img ng-src="{{applicationLogoPath}}"/></div><div class="pull-left"><a class="brand-name master-brand-name" href="javascript:void(0)" ng-click="showMasterMenu()" >{{applicationName}}</a></div><div class="pull-left"> <a class="brand-name master-brand-name" href="javascript:void(0)" ng-click="showMasterMenu()" ng-if="!isPined && megaMenuArrow"><cp-icon icon-class="chevron-down"></cp-icon></a></div><div class="pull-right remove-pin" ng-if="isShowMegaMenu" ng-click="showMasterMenu()"> <span class="glyphicon glyphicon-remove"> </span></div><div class="pull-right remove-pin" ng-if="isShowMegaMenu" ng-click="showSkinnyMenu()"> <span class="glyphicon glyphicon-pushpin"></span></div></div><cp-mega-menu ng-if="isShowMegaMenu" navigation-model ="navigationModel"></cp-mega-menu></div></div><div class="navbar-collapse collapse" id="masterNavigation" aria-expanded="true" ng-transclude> </div></div></div><div class="skinny-navigation " ng-if="isPined" style="position:relative; top:51px;"><cp-top-navigation  navigation-model="navigationModel"><cp-top-navigation-list></cp-top-navigation-list></cp-top-navigation><div class="stick-remove-pin" ng-click="showSkinnyMenu()"><span class="glyphicon glyphicon-pushpin"></span></div></div></nav>');

    $templateCache.put("nav-control.html", "<div class='nav navbar-nav navbar-right' ng-transclude></div>");

    $templateCache.put("control-button.html", "<li class=''><a href='javascript:void(0)' ng-transclude ng-click='showDropDown()'></a> <div class='control-dropdown' ng-if='active' ><span ng-include='url'> </span> </div> </li>");

    $templateCache.put("search-template.html", "<div class='global-search'><div class='cpc-right-inner-addon'><input type='search' class='form-control' placeholder='Search'><i class='glyphicon glyphicon-search'></i></div></div>");

    

    $templateCache.put("top-navigation-template.html", "<nav class='navbar cpc-top-nav skinny-nav-box'><div class='container-fluid'><ul class='nav navbar-nav'><li data-ng-repeat='navItems in navigationModel'><cp-top-navigation-list nav-item='navItems' ng-if='!navItems.children.length && navItems.link != \"popup\"'></cp-top-navigation-list><cp-top-navigation-list-pop-up nav-item='navItems' ng-if='!navItems.children.length && navItems.link == \"popup\"'></cp-top-navigation-list-pop-up> <cp-top-sub-navigation  nav-item='navItems' ng-if='navItems.children.length > 0'></cp-top-sub-navigation> <ul ng-if='navItems.children.length > 0' class='dropdown-menu'><li data-ng-repeat='subItem in navItems.children'><a ng-if='subItem.link == \"popup\"' href=javascript:void(0) ng-click='showPopup({label:subItem.label})'>{{subItem.label}}</a> <a ng-if='subItem.link != \"popup\"' ui-sref={{subItem.link}}>{{subItem.label}}</a></li></ul> </li></ul></div></nav>");

    $templateCache.put("top-navigation-list-template.html", "<a id='{{navItem.id}}' ui-sref={{navItem.link}}><cp-icon icon-class='{{navItem.icon}}'></cp-icon> {{navItem.label}} </a>");
    $templateCache.put("top-navigation-popup-list-template.html", "<a id='{{navItem.id}}' href='javascript:void(0)' ng-click='showPopup({label:navItem.label})'><cp-icon icon-class='{{navItem.icon}}'></cp-icon> {{navItem.label}} </a>");

    $templateCache.put("top-sub-navigation-template.html", "<a ng-class=\"{'dropdown-toggle':navItem.children.length}\" data-toggle='dropdown' role='button' aria-haspopup=\"{{navItem.children.length > 0}}\" aria-expanded='false'><cp-icon icon-class='{{navItem.icon}}'></cp-icon> {{navItem.label}} <span ng-class=\"{caret:navItem.children.length}\"></span></a>");


    $templateCache.put("sub_navigationslist.html", "<ul class='dropdown-menu'><li data-ng-repeat='subItem in subItems'><a ui-sref={{subItem.link}}>{{subItem.label}}</a></li></ul>");

    $templateCache.put('cpalerttemplate.html', "<div cp-alert ng-show='subview' class='' ng-switch='subview'><div class='modal fade in alert-box' ng-class='{in:subview}' role='dialog'><div ng-switch-when='alert' ng-controller='AlertModalController' class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' ng-click='close()'>&times;</button><h3 class='modal-title'> <i class='cp-icon-{{icon}}'></i> {{title}}</h3></div><div class='modal-body'><p>{{message }}</p></div><div class='modal-footer'><button type='button' class='btn btn-default' ng-click='close()'>Close</button></div></div></div><div ng-switch-when='confirm' ng-controller='ConfirmModalController' class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' ng-click='close()'>&times;</button><h3 class='modal-title'> <i class='cp-icon-{{icon}}'></i> {{title}}</h3></div><div class='modal-body'><p>{{ message }}</p></div><div class='modal-footer'><button type='button' class='btn btn-primary' ng-click='confirm()'>{{ labelConfirmBtn }}</button> &mdash;<button type='button' class='btn btn-default' ng-click='close()'>{{ labelCancelBtn }}</button></div></div></div><div ng-switch-when='prompt' ng-controller='PromptModalController' class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' ng-click='close()'>&times;</button><h3 class='modal-title'> <i class='cp-icon-{{icon}}'></i> {{title}}</h3></div><div class='modal-body'><form novalidate ng-submit='submit()'><p>{{ message }}</p><p ng-if='errorMessage'> <strong>Sorry:</strong> {{ errorMessage }} </p><p> <input type='text' ng-model='form.input' />  </p></form></div><div class='modal-footer'><button type='button' class='btn btn-primary' ng-click='submit()'> Submit </button> &mdash;<button type='button' class='btn btn-default' ng-click='close()'> Cancel </button></div></div></div></div></div>");

    $templateCache.put("cp-alert-template.html", "<div class='panel panel-default alert-drop-down'><div class='panel-title'><h3 class='panel-title'><cp-icon icon-class='bell'></cp-icon>Event</h3></div><div class='panel-body'><ul class='list-group'><li class='list-group-item-text alert-post-item' ng-repeat='alertItem in alertItems'><cp-icon class='alert-type' icon-class='{{alertItem.icon}}'></cp-icon><p class='alert-description'>{{alertItem.description}} </p><div class='event-eraser'><span class='erase-post'>{{alertItem.name}}</span><span class='erase-date'>{{alertItem.date}}</span></div></li></ul></div><div class='panel-footer'><a href='#' ng-click=''> <cp-icon icon-class='bell'></cp-icon>  View all Events </a><a href='#' ng-click='' class='pull-right'> <cp-icon icon-class='bell' size='10px'></cp-icon> {{getDangerAlert()}} </a><a href='#' ng-click='' class='pull-right'> <cp-icon icon-class='bell'></cp-icon> 12 </a><a href='#' ng-click='' class='pull-right'> <cp-icon icon-class='bell'></cp-icon> 20 </a></div></div>");

    $templateCache.put("cpmodalTemplate.html", "<div cp-modals ng-show='showModal'><div class='modal fade in alert-modal' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' ng-click='close()'>&times;</button><h3 class='modal-title'> <i class='cp-icon-{{icon}}'></i> {{title}}</h3></div><div class='modal-body' ng-include='popupTemp'></div><div class='modal-footer' ng-transclude></div></div></div></div><div class='model-bg'></div></div>");

  //  $templateCache.put("cpmodalTemplate.html", "<div cp-modals ng-if='showModal'><div class='modal fade in alert-modal' role='dialog' ng-include='popupTemp'></div><div class='model-bg'></div></div>");



 
    $templateCache.put("megamenu-template.html", "<div class='mega-navbar'><div class='mega-menu-list'><div class='megamenu-navigation'><h5 ng-repeat='menuItem in singleMenus' ><a ui-sref='{{menuItem.link}}' title='{{menuItem.label}}' class=''> <cp-icon icon-class='{{menuItem.icon}}'> </cp-icon> {{menuItem.label}} </a></h5></div><div ng-repeat='megaMenu in nestedMenus' class='megamenu-navigation'><h5><a title='{{megaMenu.label}}' class=''> <cp-icon icon-class='{{megaMenu.icon}}'></cp-icon> {{megaMenu.label}}</a></h5><ul ng-if='megaMenu.children.length' class='mega-submenu-list megamenu-subnav'><li ng-repeat='submenu in megaMenu.children'><a ui-sref='{{submenu.link}}' class=''><cp-icon icon-class='{{submenu.icon}}'> </cp-icon> {{submenu.label}}</a></li></ul></div></div></div>");
    //MasterHead template


    $templateCache.put("select-template.html", "<div class='form-group'><label ng-show='isPartial'>{{label}}</label><div><div class='selectBox {{classNames}}' ng-class={'cp-disabled':disabled}><div class='selectbox-selector' ng-click='selectbox();'>{{selectedOption}}<i class='cp-icon-caret-down' ng-hide='showFilter'></i><i class='cp-icon-caret-up' ng-hide='!showFilter'></i><i class='cp-icon-times' ng-click='clear();$event.stopPropagation();' ng-if='isIconClear'></i></div><div class='selectbox-dropdown'><div class='selectbox-selector-filter ng-hide' ng-show='showFilter'><div class='selectbox-filter-area'><input class='selectbox-filter-input' type='text' ng-model='optionFilter'><i class='cp-icon-search' ng-click='$event.stopPropagation();'></i><ul><li ng-repeat='option in selectOptions | filter:optionFilter' ng-click='select(option)' class='selectbox-selector-option'>{{option[labelKey]}}</li></ul></div></div><div ng-class=\"{'selectbox-inline-error':errorState=='right','selectbox-block-error':errorState!='right'}\" ng-show='showError'  class='help-block'>{{'cp_coreerror_messages.required' | translate}} </div></div></div></div></div>");

    $templateCache.put("multiselect-template.html", "<div class='form-group'><label ng-show='isPartial'>{{label}}</label><div><div class='selectBox {{classNames}}'  ng-class={'cp-disabled':disabled} ><span ng-show='showToolTip' style='position: absolute;top: -30px; white-space: nowrap; left: 0; color:#fff; padding:2px 3px; background:#007DB8;'>{{selectedOption}}</span><div class='selectbox-selector' ng-click='selectbox();' ng-mouseenter='showSelectItem()' ng-mouseleave='hideSelectItem()'><span style='position:absolute;right:25px;left:7px;overflow:hidden;height:28px;'>{{selectedOption}}</span><i class='cp-icon-caret-down' ng-hide='showFilter'></i><i class='cp-icon-caret-up' ng-hide='!showFilter'></i><i class='cp-icon-times' ng-click='clear();$event.stopPropagation();' ng-if='isIconClear'></i></div><div class='selectbox-dropdown'><div class='selectbox-selector-filter  ng-hide' ng-show='showFilter'><div class='selectbox-filter-area'><input class='selectbox-filter-input ng-valid ng-touched ng-dirty ng-valid-parse ng-empty' type='text' ng-model='optionFilter'><i class='cp-icon-search' ng-click='$event.stopPropagation();'></i><ul><li ng-repeat='option in selectOptions | filter:optionFilter' ng-click='select()' class='selectbox-selector-option'><label><input type='checkbox' ng-model='option.isSelected' /> {{option[labelKey]}}</label></li></ul></div></div><div ng-class=\"{'selectbox-inline-error':errorState=='right','selectbox-block-error':errorState!='right'}\" ng-show='showError'  class='help-block'>{{'cp_coreerror_messages.required' | translate}} </div></div></div></div></div>");

$templateCache.put("image-template.html", "<img ng-src={{imgSrc}} alt={{alt}} />");
$templateCache.put("link-template.html", "<a class='link-btn {{class}}' href={{href}} ng-transclude> </a>");

$templateCache.put("drop-down-button-template.html", "<span class='dropdown-container'><a class='dropdown-button' href='javascript:void(0)'  ng-click='showDrop()' ng-transclude>  </a> <div class='control-dropdown' ng-show='active' ><span ng-include='url'> </span> </div></span>");

$templateCache.put("tab-template.html", "<div class=''><ul class='nav nav-tabs cpc-tabs'><li ng-repeat='tab in tabs' ng-class='{active:tab.selected}'><a  href='javascript:void(0)' ng-click='selectedTab(tab)'>  {{tab.title}} </a> </li></ul><div ng-transclude> </div></div>");

$templateCache.put("fieldset-template.html", "<fieldset class='cp-fieldset'><legend class='cp-legend' ng-if='label'>{{label}}</legend><div ng-transclude></div></fieldset>");

$templateCache.put("checkbox-template.html", '<div class="form-group"><label ng-show="isPartial">{{label}}</label><div><div ng-repeat="option in selectOptions" class="checkbox {{cpClass}}"><input type="checkbox" ng-model="option.isSelected" value="option[valueKey]" ng-change="select(option)" id="option{{$index}}" /><label for="option{{$index}}">{{option[labelKey]}}</label></div><div ng-if="showError"  class="help-block inline-error">{{"cp_coreerror_messages.required" | translate}} </div></div></div>');

    //left navigation template 



$templateCache.put("left-navigation-template.html", "<nav class='navbar' role='navigation'><ul class='cpc-left-nav nav nav-stack'><list-navigation ng-repeat='navigationItem in navigationModel' nav-list='navigationItem'></list-navigation></ul></nav>");

$templateCache.put("left-navigation-list-template.html", "<li role='presentation' class='collapsed' ng-class='{active:select}'><a  id='{{navList.id}}' ui-sref='{{navList.link}}' ng-if='!subMenu.length && navList.link !== \"popup\"'>{{navList.label}}</a> <a  id='{{navList.id}}' href='javascript:void(0)' ng-click='showPopup({label:navList.label})' ng-if='!subMenu.length && navList.link === \"popup\"'>{{navList.label}}</a> <a class='drop-down-menu' ng-if='subMenu.length'> {{navList.label}} </a></li>");


$templateCache.put("calendar-template.html", '<div><datepicker selector="form-control" datepicker-show="{{visibility}}" date-min-limit="{{manharan}}" date-format="dd-MM-yyyy"><div class="input-group"><input class="form-control angular-datepicker-input" ng-model="bind" placeholder=" Choose a date"/></div></datepicker></div>');

$templateCache.put("hours-dropdown-template.html", "<div class='select-time'><select ng-model='ngModel' ng-options='hour for hour in hours' class='form-control'> </select></div>");
    
$templateCache.put("minutes-dropdown-template.html", "<div class='select-time'><select ng-model='ngModel' ng-options='minute for minute in minutes' class='form-control'> </select></div>");

$templateCache.put("scroll-to-top-template.html", '<a href="javascript:void(0)" ng-click="onTop()" class="top-scroll-btn"> </a>');

$templateCache.put("page-tab-template.html", "<div><ul class='nav nav-tabs cpc-tabs'><li ng-repeat='tab in tabModel' ng-class={active:$index==selectedIndex}><a ui-sref='{{tab.link}}'  ng-click='selectTab($index)'> {{tab.label}}</a></li></ul><div ui-view autoscroll='false'></div></div>");


$templateCache.put("cp-page-accordion-template.html", "<div id='accordion'><div ng-repeat='accordion in accordionModel'><h3><a data-toggle='collapse' href='#' ng-click=select($index)> {{accordion.label}} </a></h3><div id='collapse{{$index}}' class='collapse' ng-class='{in:$index==selectedIndex}' ng-include='accordion.templateUrl' ng-animate=\"{enter: 'animate-enter', leave: 'animate-leave'}\"></div></div></div>");


$templateCache.put("progress-template.html", '<div class="modal fade in progress-modal" role="dialog" ng-show="showProgress"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-body"><div style="text-align:center;"><h3 style="border-bottom: 1px solid #eee; margin-top:0px;">An action is in progress </h3><p>Please wait ...</p><div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"><span class="sr-only">100% Complete</span></div></div></div></div></div></div></div>');

$templateCache.put("tree-template.html", "<div class='tree-element'><cp-tree-list tree-model='treeModel'></cp-tree-list></div>");

$templateCache.put("tree-list-template.html", "<ul><cp-tree-list-item tree-list-model='treeModel'> </cp-tree-list-item></ul>");

$templateCache.put("tree-item-template.html", "<li ng-repeat='tree in treeListModel'><i class='fa fa-plus tree-icon' ng-if='tree.subTree.length>0' ng-click='test()'></i><span class='fa fa-file tree-icon' ng-if='tree.subTree.length==0'></span><a href=''>{{tree.label}}</a><cp-tree-list if='tree.subTree.length' tree-model='tree.subTree' ></cp-tree-list></li>");


$templateCache.put("grid-pagination-template.html", '<div class="pagination-wrapper"><p class="pull-left">{{gridApi.grid.options.totalItems}} Item (s) found. Displaying {{getStartPageIndex()}}</p><nav aria-label="Page navigation" ng-if="gridApi.pagination.getTotalPages() > 1"><ul class="pagination pull-right" style="margin:0px;"><li class="page-item"><a class="page-link" ng-class="{disabled:gridApi.pagination.getPage() == 1}" href="javascript:void(0)" ng-click="gridApi.pagination.seek(1)">First</a></li><li class="page-item"><a class="page-link" href="javascript:void(0)" ng-click="gridApi.pagination.previousPage()" ng-class="{disabled:gridApi.pagination.getPage() == 1}">Previous</a></li><li class="page-item"><input type="number" class="pagination-input" value="1" min="1" max="{{gridApi.pagination.getTotalPages()}}" ng-change="onPageChange(this)" ng-model="gridPageNumber" /></li><li class="page-item"><a ng-class="{disabled:gridApi.pagination.getTotalPages()==gridApi.pagination.getPage()}" class="page-link" href="javascript:void(0)" ng-click="gridApi.pagination.nextPage()">Next</a></li><li class="page-item"><a class="page-link" href="javascript:void(0)" ng-click="gridApi.pagination.seek(gridApi.pagination.getTotalPages())" ng-class="{disabled:gridApi.pagination.getTotalPages()==gridApi.pagination.getPage()}">Last</a></li></ul></nav></div>');

$templateCache.put("error-message-template.html", '<div class="global-error-message alert" id="{{modalScope}}"><div style="display:table-row; vertical-align: middle;"><i style="vertical-align: middle; height: 100%; display: table-cell;" class="{{icon}}"></i>  <span style="padding:0 10px; display:inline-block;"></span></div><i ng-click="close()" class="icon-size cp-icon-times global-message-clocse"></i></div>');



}])


