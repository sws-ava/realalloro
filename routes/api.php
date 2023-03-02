<?php

use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\OAuthController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\Auth\VerificationController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Admin\FeedbackController;
use App\Http\Controllers\Admin\ReviewController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\InteriorController;
use App\Http\Controllers\Admin\GoodsCatsController;
use App\Http\Controllers\Admin\GoodsController;
use App\Http\Controllers\Admin\NewsController;
use App\Http\Controllers\Admin\GoodsItemController;
use App\Http\Controllers\Admin\OrdersController;
use App\Http\Controllers\Admin\SubMainController;
use App\Http\Controllers\Admin\SiteImagesController;
use App\Http\Controllers\Admin\PaperMenuController;
use App\Http\Controllers\BlocksController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'auth:api'], function () {
    Route::post('logout', [LoginController::class, 'logout']);

    Route::get('user', [UserController::class, 'current']);

    Route::patch('settings/profile', [ProfileController::class, 'update']);
    Route::patch('settings/password', [PasswordController::class, 'update']);



    


    // Admin

    // SubMain 
    Route::get('admin/getUnreadedMessages', [SubMainController::class, 'getUnreadedMessages']);
    Route::get('admin/getUnreadedOrders', [SubMainController::class, 'getUnreadedOrders']);
    
    // Feedbacks
    Route::get('admin/getFeedbacks', [FeedbackController::class, 'getFeedbacks']);
    Route::post('admin/feedbackReaded', [FeedbackController::class, 'feedbackReaded']);
    Route::post('admin/feedbackNotReaded', [FeedbackController::class, 'feedbackNotReaded']);
    Route::post('admin/feedbackRemove', [FeedbackController::class, 'feedbackRemove']);

    // Reviews
    Route::get('admin/getReviews', [ReviewController::class, 'getReviews']);
    Route::post('admin/reviewShow', [ReviewController::class, 'reviewShow']);
    Route::post('admin/reviewHide', [ReviewController::class, 'reviewHide']);
    Route::post('admin/reviewRemove', [ReviewController::class, 'reviewRemove']);
    Route::post('admin/saveReview', [ReviewController::class, 'saveReview']);

    // Pages
    Route::get('admin/getPages', [PageController::class, 'getPages']);
    Route::get('admin/fetchPage', [PageController::class, 'getPage']);
    Route::post('admin/savePage', [PageController::class, 'savePage']);

    // News
    Route::post('admin/getNewsByCat', [NewsController::class, 'getNewsByCat']);
    Route::get('admin/fetchNews', [NewsController::class, 'fetchNews']);
    Route::post('admin/saveNews', [NewsController::class, 'saveNews']);
    Route::post('admin/addNews', [NewsController::class, 'addNews']);
    Route::post('admin/deleteNews', [NewsController::class, 'deleteNews']);
    Route::post('admin/showPage', [NewsController::class, 'showPage']);
    
    // Gallery
    Route::get('admin/getPhotos', [GalleryController::class, 'getPhotos']);
    Route::post('admin/photoOrderLeft', [GalleryController::class, 'orderLeft']);
    Route::post('admin/photoOrderRight', [GalleryController::class, 'orderRight']);
    Route::post('admin/deletePhoto', [GalleryController::class, 'deletePhoto']);
    Route::post('admin/uploadPhoto', [GalleryController::class, 'uploadPhoto']);
    
    // Images
    Route::get('admin/getSiteImages', [SiteImagesController::class, 'getPhotos']);
    Route::post('admin/deleteSiteImage', [SiteImagesController::class, 'deletePhoto']);
    Route::post('admin/uploadSiteImage', [SiteImagesController::class, 'uploadPhoto']);

    // Paper
    Route::get('admin/getPaper', [PaperMenuController::class, 'getPhotos']);
    Route::post('admin/paperOrderLeft', [PaperMenuController::class, 'orderLeft']);
    Route::post('admin/paperOrderRight', [PaperMenuController::class, 'orderRight']);
    Route::post('admin/deletePaper', [PaperMenuController::class, 'deletePhoto']);
    Route::post('admin/deleteAllPaper', [PaperMenuController::class, 'deleteAllPhoto']);
    Route::post('admin/uploadPaper', [PaperMenuController::class, 'uploadPhoto']);

    // Interior
    Route::get('admin/getPhotosInterior', [InteriorController::class, 'getPhotosInterior']);
    Route::post('admin/photoOrderLeftInterior', [InteriorController::class, 'orderLeftInterior']);
    Route::post('admin/photoOrderRightInterior', [InteriorController::class, 'orderRightInterior']);
    Route::post('admin/deletePhotoInterior', [InteriorController::class, 'deletePhotoInterior']);
    Route::post('admin/uploadPhotoInterior', [InteriorController::class, 'uploadPhotoInterior']);

    // Goods categories
    Route::get('admin/getGoodsCats', [GoodsCatsController::class, 'getGoodsCats']);
    Route::get('admin/getCategory', [GoodsCatsController::class, 'getCategory']);
    Route::post('admin/saveCategory', [GoodsCatsController::class, 'saveCategory']);
    Route::post('admin/addCategory', [GoodsCatsController::class, 'addCategory']);
    Route::post('admin/deleteCategory', [GoodsCatsController::class, 'deleteCategory']);
    Route::post('admin/categoryOrderTop', [GoodsCatsController::class, 'orderTop']);
    Route::post('admin/categoryOrderBottom', [GoodsCatsController::class, 'orderBottom']);
    Route::post('admin/showCategory', [GoodsCatsController::class, 'showCategory']);

    // Goods Items
    Route::get('admin/getItemsByCategory', [GoodsController::class, 'getItemsByCategory']);
    Route::post('admin/showSubItem', [GoodsController::class, 'showSubItem']);
    Route::post('admin/showItem', [GoodsController::class, 'showItem']);
    Route::post('admin/changePriceFetch', [GoodsController::class, 'changePriceFetch']);
    Route::post('admin/itemOrderTop', [GoodsController::class, 'orderTop']);
    Route::post('admin/itemOrderBottom', [GoodsController::class, 'orderBottom']);

    Route::post('admin/getGoodsItem', [GoodsController::class, 'getGoodsItem']);
    // Route::post('admin/getGoodsItem', [GoodsController::class, 'getGoodsItem']);

    // Goods Sub Items inside Item and  edit item
    Route::post('admin/subItemOrderTop', [GoodsItemController::class, 'orderTop']);
    Route::post('admin/subItemOrderBottom', [GoodsItemController::class, 'orderBottom']);
    Route::post('admin/addSubItem', [GoodsItemController::class, 'addSubItem']);
    Route::post('admin/deleteSubItem', [GoodsItemController::class, 'deleteSubItem']);
    Route::post('admin/editSubItem', [GoodsItemController::class, 'editSubItem']);
    Route::post('admin/removeItemPhoto', [GoodsItemController::class, 'removeItemPhoto']);
    Route::post('admin/uploadItemPhoto', [GoodsItemController::class, 'uploadItemPhoto']);
    Route::post('admin/removeItem', [GoodsItemController::class, 'removeItem']);
    Route::post('admin/editItem', [GoodsItemController::class, 'editItem']);
    Route::post('admin/addItem', [GoodsItemController::class, 'addItem']);

    // Orders
    Route::get('admin/getNewOrders', [OrdersController::class, 'getNewOrders']);
    Route::get('admin/getDoneOrders', [OrdersController::class, 'getDoneOrders']);
    Route::post('admin/getOrder', [OrdersController::class, 'getOrder']);
    Route::post('admin/incrementOrderItem', [OrdersController::class, 'incrementOrderItem']);
    Route::post('admin/decrementOrderItem', [OrdersController::class, 'decrementOrderItem']);
    Route::post('admin/countOrderTotalSum', [OrdersController::class, 'countTotalSum']);
    Route::post('admin/removeOrderItem', [OrdersController::class, 'removeOrderItem']);
    Route::post('admin/removeOrder', [OrdersController::class, 'removeOrder']);
    Route::post('admin/showSameOrderItemsByCat', [OrdersController::class, 'showSameOrderItemsByCat']);
    Route::post('admin/changeOrderStatus', [OrdersController::class, 'changeOrderStatus']);
    Route::post('admin/fetchDishesByQuery', [OrdersController::class, 'fetchDishesByQuery']);
    Route::post('admin/addDishToOrderMenuItems', [OrdersController::class, 'addDishToOrderMenuItems']);
    Route::post('admin/saveOrder', [OrdersController::class, 'saveOrder']);

    // Blocks
    Route::get('admin/getBlocks', [BlocksController::class, 'getBlocks']);
    Route::post('admin/saveBlocks', [BlocksController::class, 'saveBlocks']);
    
    
});

Route::group(['middleware' => 'guest:api'], function () {
    Route::post('login', [LoginController::class, 'login']);
    Route::post('register', [RegisterController::class, 'register']);

    Route::post('password/email', [ForgotPasswordController::class, 'sendResetLinkEmail']);
    Route::post('password/reset', [ResetPasswordController::class, 'reset']);

    Route::post('email/verify/{user}', [VerificationController::class, 'verify'])->name('verification.verify');
    Route::post('email/resend', [VerificationController::class, 'resend']);

    Route::post('oauth/{driver}', [OAuthController::class, 'redirect']);
    Route::get('oauth/{driver}/callback', [OAuthController::class, 'handleCallback'])->name('oauth.callback');

    
});



    // Client

    // Pages
    // Route::get('getMainPage', [PageController::class, 'getMainPage']);
    // Route::get('getConcept', [PageController::class, 'getConcept']);
    // Route::get('getContacts', [PageController::class, 'getContacts']);
    // Route::get('getDelivery', [PageController::class, 'getDelivery']);
    
    Route::post('addView', [PageController::class, 'addView']);

    
    Route::get('getNews', [NewsController::class, 'getNews']);
    Route::get('getSales', [NewsController::class, 'getSales']);

    Route::get('getTranslateRu', [PageController::class, 'getTranslateRu']);
    Route::get('getTranslateUa', [PageController::class, 'getTranslateUa']);

    Route::get('getInteriorImages', [PageController::class, 'getInteriorImages']);
    Route::get('getGalleryImages', [PageController::class, 'getGalleryImages']);
    
    Route::get('getMenu', [PageController::class, 'getMenu']);
    Route::get('getMenuPhotos', [PageController::class, 'getMenuPhotos']);
    Route::post('getCartItems', [PageController::class, 'getCartItems']);
    Route::post('setNewOrder', [PageController::class, 'setNewOrder']);


    // Feedbacks
    Route::post('admin/addFeedback', [FeedbackController::class, 'addFeedback']);

    
    