<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model common\models\User */

$this->title = $model->username;
$this->params['breadcrumbs'][] = ['label' => 'Usuários', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="user-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Atualizar', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Deletar', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Você tem certeza que deseja deletar este item?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            //'id',
            'username',
            'email:email',
            [
              'attribute' => 'id_curso',
              'value' => $model->curso->nome,
            ],
            
           'created_at:datetime'
          //  [
          //    'attribute' => 'Número de usuários',
          //    'value' => User::find()->where('id_curso=1')->count();
          //  ],
            // [
            //   'attribute' => 'created_at',
            //   'value' => $data,
            // ],
        //    'data'
        ],
    ]) ?>

</div>
