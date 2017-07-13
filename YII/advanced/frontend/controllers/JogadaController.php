<?php
namespace frontend\controllers;

use Yii;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use common\models\LoginForm;
use frontend\models\PasswordResetRequestForm;
use frontend\models\ResetPasswordForm;
use frontend\models\SignupForm;
use frontend\models\ContactForm;


class JogadaController extends Controller {


    public function actionPlay(){
        pontuacao = 100;
        $.ajax({
          type: 'POST',
          url: '". Url::to(['jogada/save']) ."',
          data: {
          pontuacao: pontuacao
          },
          success: function(data) {
          console.log(data);
        }
      });
    }

    public function actionRaking(){
        
    }

    public function actionSave(){
        if (!Yii::$app->user->isGuest) {
          $pontuacao = Yii::$app->request->post('pontuacao');
          $user = Yii::$app->user->identity->id;
          $jogada = new Jogada;
          $jogada->id_user = $user;
          $jogada->pontuacao = $pontuacao;
        if ($jogada->save()) {
          return 1;
        } else {
          return 0;
        }
      }
    }

}
