<?php

namespace frontend\controllers;

class JogadaController extends \yii\web\Controller
{
    public function actionPlay()
    {
        return $this->render('play');
    }

    public function actionRanking()
    {
        return $this->render('ranking');
    }

    public function actionSave()
    {
        return $this->render('save');
    }

}
