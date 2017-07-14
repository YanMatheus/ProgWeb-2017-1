<?php

use yii\helpers\Html;
use yii\widgets\DetailView;
use common\models\User;

/* @var $this yii\web\View */
/* @var $model common\models\Curso */

$this->registerCss('th {text-align: right !important; }');
$this->title = $model->nome;
$this->params['breadcrumbs'][] = ['label' => 'Cursos', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="curso-view">

    <h1><?= $model->nome ?></h1>

    <p>
        <?= Html::a('Atualizar', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Excluir', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Are you sure you want to delete this item?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'nome',
            'sigla',
            'descricao:ntext',
            [
                'label' => 'Número de alunos',
                'value' => User::find()->where(['id_curso' => $model->id])->count()
            ]
        ],
    ]) ?>

    <!-- view editada
    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'nome',
            'sigla',
            [
            	'label' => 'O que eu quiser',
            	'value' => '<b>' . $model->descricao . '</b>',
            	'format' => 'html'
            ],
        ],
    ]) ?>
	-->

</div>
