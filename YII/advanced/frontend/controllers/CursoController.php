<?php

namespace frontend\controllers;

use Yii;
use common\models\Curso;
use common\models\User;
use common\models\CursoSearch;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

/**
 * CursoController implements the CRUD actions for Curso model.
 */
class CursoController extends Controller
{
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'delete' => ['POST'],
                ],
            ],
        ];
    }

    /**
     * Lists all Curso models.
     * @return mixed
     */
    public function actionIndex()
    {
        $searchModel = new CursoSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single Curso model.
     * @param integer $id
     * @return mixed
     */
    public function actionView($id)
    {

      $model = Curso::findOne(['id' => $id]);

      if ($model == null) {
          $model = Curso::findOne(['sigla'=>'IE08']);
      }
      $num_alunos = User::find()->where('id_curso ='. $model->id)->count();
        return $this->render('view', [
            'model' => $model, 'num_alunos' => $num_alunos,
      ]);
    }

    /**
     * Creates a new Curso model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate()
    {
        $model = new Curso();
        // $model->sigla = 'FT05';
        // $model->nome = 'Engenharia da Computação';
        // $model->descricao = 'O curso de Engenharia da Computação, implantado na Faculdade de Tecnologia, visa formar profissionais capacitados para utilizar a tecnologia da computação na solução dos problemas ligados à automação de sistemas. Os egressos desse curso devem estar situados no estado da arte da ciência e da tecnologia da computação, de tal forma que possam continuar suas atividades na pesquisa, promovendo o desenvolvimento científico, ou aplicando os conhecimentos científicos, promovendo o desenvolvimento tecnológico.';
        // $new = $model->isNewRecord;
        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id]);
        } else {
            return $this->render('create', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Updates an existing Curso model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $id
     * @return mixed
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id]);
        } else {
            return $this->render('update', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Deletes an existing Curso model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param integer $id
     * @return mixed
     */
    public function actionDelete($id)
    {
        $this->findModel($id)->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the Curso model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param integer $id
     * @return Curso the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Curso::findOne($id)) !== null) {
            return $model;
        } else {
            $model = Curso::findOne(['sigla' => 'IE08']);
            return $model;
        }
    }

    protected function actionUsers($id_curso){
    //    if ($id_curso != null) {
          $aluno = Aluno::find()->with('id_curso')->where(['id_curso' => $id_curso])->one();
          $curso = $aluno->curso->nome;
          return $this->render('view', [
            'model' => $model,
      ]);
    }
}
