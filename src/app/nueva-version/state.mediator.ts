export enum StateType {
  PrincipalNoPanel,
  PrincipalPanel,
  DetailNoPanel,
  DetailPanel,
 //ESTADOS POSIBLES
 //Es el panel izquierdo visible?
 //Estamos en el panel principal o en el detail?
}

export enum PanelType {
    Primary,
    Detail
}

export interface IState {
    getPanelType() : PanelType;
    getStateType() : StateType;
    isSideNavVisible() : boolean;
    getPanelButtonClass() : string;
}

export class PrincipalSinPanel implements IState{
  getPanelType(): PanelType { return PanelType.Primary; }
  getStateType(): StateType { return StateType.PrincipalNoPanel; }
  getPanelButtonClass(): string { return 'fa-chevron-right'; } //Devuelve una clase para >
  isSideNavVisible(): boolean { return false; }
}

export class PrincipalConPanel implements IState {
  getPanelType(): PanelType { return PanelType.Primary; }
  getStateType(): StateType { return StateType.PrincipalPanel; }
  getPanelButtonClass(): string { return 'fa-chevron-right'; } //Devuelve una clase para >
  isSideNavVisible(): boolean { return true }
}

export class DetailSinPanel implements IState {
  getPanelType(): PanelType { return PanelType.Detail; }
  getStateType(): StateType { return StateType.DetailNoPanel; }
  getPanelButtonClass(): string { return 'fa-chevron-left'; } //Devuelve una clase para >
  isSideNavVisible(): boolean { return false; }
}

export class DetailConPanel implements IState {
  getPanelType(): PanelType { return PanelType.Detail; }
  getStateType(): StateType { return StateType.DetailPanel; }
  getPanelButtonClass(): string { return 'fa-chevron-left'; } //Devuelve una clase para >
  isSideNavVisible(): boolean { return false; }
}

/*export class UN_ESTADO_DE_EJEMPLO //extends State
    implements IState {
    getPanelType() : PanelType { return PanelType.LO_QUE_SEA; }
    getStateType() : StateType { return StateType.LO_QUE_SEA; }
    getPanelButtonClass() : string { return 'fa-chevron-right';} //Devuelve una clase para >
    isSideNavVisible() : boolean { return false; }
}*/



export interface IMediatorImpl {
    showNavPanel();
    hideNavPanel();
    showDetailPanel();
    hideDetailPanel();
    changeShowHideSideButton(fromClass: string, toClass: string);
}

export class Mediator { //Permite trabajar con los estados
  private _estadoPsp = new PrincipalSinPanel();
  private _estadoPcp = new PrincipalConPanel();
  private _estadoDsp = new DetailSinPanel();
  private _estadoDcp = new DetailConPanel();

    //RESTO DE ESTADOS POSIBLES...

    private _currentState: IState;
    //private _currentMainPanelState: IState;
    private _currentPanelState: IState;
    private _mediatorImpl: IMediatorImpl;

    //Se le inyecta una implementación concreta, independientemente de la UI
    constructor(mediatorImpl: IMediatorImpl) {
      this._mediatorImpl = mediatorImpl;
      //this._currentState = this._currentMainPanelState = this._sideNavState;
      this._currentState = this._estadoPcp;
      this._currentPanelState = this._currentState;
    }

    getStateImpl(stateType: StateType) : IState {
        var stateImpl : IState;
        switch(stateType) {
            //DEVOLVER ESTADO DE ACUERDO AL ENUM 
            case StateType.PrincipalNoPanel:
              stateImpl = this._estadoPsp;
              break;
            case StateType.PrincipalPanel:
              stateImpl = this._estadoPcp;
              break;
            case StateType.DetailNoPanel:
              stateImpl = this._estadoDsp;
              break;
            case StateType.DetailPanel:
              stateImpl = this._estadoDcp;
              break;
            //...RESTO
        }
        return stateImpl;
    }

    moveToState(stateType: StateType) {
        var previousState = this._currentState;
        var nextState = this.getStateImpl(stateType);

        //LOGICA PARA MOVERSE ENTRE ESTADOS
    }

    //Abrir y cerrar el sideNav
    showHideSideNavClicked() {
        switch (this._currentState.getStateType()) {
            case StateType.PrincipalNoPanel:
                this.moveToState(StateType.PrincipalPanel);
                break;
            case StateType.PrincipalPanel:
                this.moveToState(StateType.PrincipalNoPanel);
                break;
            case StateType.DetailNoPanel:
              this.moveToState(StateType.DetailPanel);
              break;
            case StateType.DetailPanel:
              this.moveToState(StateType.DetailNoPanel);
              break;
        }
    }

    switchPrimaryDetail() {
      switch (this._currentState.getStateType()) {
        case StateType.PrincipalNoPanel:
          this.moveToState(StateType.DetailNoPanel);
          break;
        case StateType.PrincipalPanel:
          this.moveToState(StateType.DetailPanel);
          break;
        case StateType.DetailNoPanel:
          this.moveToState(StateType.PrincipalNoPanel);
          break;
        case StateType.DetailPanel:
          this.moveToState(StateType.PrincipalPanel);
          break;
      }
    }

    getCurrentPanelState() : StateType {
        return this._currentPanelState.getStateType();
    }

}

