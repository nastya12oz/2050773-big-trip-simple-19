import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizePointDueDate, createDestination, createDescription} from '../utils.js';

const BLANK_POINT = {
  basePrice: 0,
  dueDate: '2022-02-24',
  dateFrom: '22022-02-24T12:55:56.845Z',
  dateTo: '2022-02-24T11:22:13.375Z',
  destination: 0,
  offersId: [0],
  type: 'Bus'
};

const createOfferTemplate = (offers) =>
  `<div class="event__available-offers">
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage">
    <label class="event__offer-label" for="event-offer-luggage-1">
      <span class="event__offer-title">${offers.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offers.price}</span>
    </label>
  </div>`;


const findOffersByID = (id, offers) => {
  const offersArray = [];

  for (let i = 0; i < id.length; i++){
    for (let j = 0; j < offers.length; j++) {
      if (offers[j].id === id[i]) {
        offersArray.push(offers[j]);
      }
    }
  }

  return offersArray;
};

const createOffers = (offers) => offers.map((offer) => createOfferTemplate(offer)).join('');

const createFormCreationTemplate = (point, destinations, offers) => {
  const {dueDate, type, destination, offersId, basePrice} = point;
  const date = humanizePointDueDate(dueDate);
  const destinationPictures = [];

  const offersArraybyId = findOffersByID(offersId, offers);


  for (let i = 0; i < destinations.length; i++) {
    destinationPictures.push(destinations[i].pictures[0].src);
  }


  return `<ul class="trip-events__list">
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                <div class="event__type-item">
                  <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${createDestination(destination, destinations)}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${date} 00:00">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${date}  00:00">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
          <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
        </header>

        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            ${createOffers(offersArraybyId)}
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description"> ${createDescription(destination, destinations)}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                <img class="event__photo" src="${destinationPictures[0]}">
                <img class="event__photo" src="${destinationPictures[1]}">
                <img class="event__photo" src="${destinationPictures[2]}">
                <img class="event__photo" src="${destinationPictures[3]}">
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>
  </ul>`;
};

export default class EditPointView extends AbstractStatefulView {
  // #point = null;
  #destinations = null;
  #offers = null;
  #handleFormSubmit = null;
  #handleRolldownClick = null;


  constructor({point = BLANK_POINT, destinations, offers, onFormSubmit, onRolldownClick}) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this._setState(EditPointView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this._restoreHandlers();
    this.#handleRolldownClick = onRolldownClick;
  }

  get template() {
    // return createFormCreationTemplate(this.#point, this.#destinations, this.#offers);
    return createFormCreationTemplate(this._state, this.#destinations, this.#offers);
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editRolldownHandler);
    this.element.querySelector('.event__type-input')
      .addEventListener('input', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#descriptionInputHandler);
  }

  #descriptionInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      description: evt.target.value,
    });
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #editRolldownHandler = (evt) => {
    evt.preventDefault();
    this.#handleRolldownClick();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };


  reset = (point) => {
    this.updateElement(
      EditPointView.parsePointToState(point)
    );
  };

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    return { ...state };
  }
}
