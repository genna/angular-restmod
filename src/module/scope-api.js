'use strict';

RMModule.factory('RMScopeApi', [function() {

  /**
   * @class ScopeApi
   *
   * @description Common behaviour for record scopes.
   *
   * Record scopes are starting points for record operations (like base type or a collection)
   *
   * TODO: Talk about record building here
   */
  return {

    /**
     * @memberof ScopeApi#
     *
     * @description Builds a new instance of this model, bound to this instance scope, sets its primary key.
     *
     * @param {mixed} _pk object private key
     * @param {object} _scope scope override (optional)
     * @return {RecordApi} New model instance
     */
    $new: function(_pk, _scope) {
      return this.$$new(_pk, _scope);
    },

    /**
     * @memberof ScopeApi#
     *
     * @description Builds a new instance of this model, does not assign a pk to the created object.
     *
     * ATTENTION: item will not show in collection until `$save` is called. To reveal item before than call `$reveal`.
     *
     * @param  {object} _init Initial values
     * @return {RecordApi} single record
     */
    $build: function(_init) {
      return this.$new().$extend(_init);
    },

    /**
     * @memberof ScopeApi#
     *
     * @description Builds a new instance of this model using undecoded data.
     *
     * ATTENTION: does not automatically reveal item in collection, chain a call to $reveal to do so.
     *
     * @param  {object} _raw Undecoded data
     * @return {RecordApi} single record
     */
    $buildRaw: function(_raw) {
      var obj = this.$new(this.$$inferKey(_raw));
      obj.$decode(_raw);
      return obj;
    },

    /**
     * @memberof ScopeApi#
     *
     * @description Attempts to resolve a resource using provided private key.
     *
     * @param {mixed} _pk Private key
     * @return {RecordApi} single record
     */
    $find: function(_pk) {
      return this.$new(_pk).$fetch();
    },

    /**
     * @memberof ScopeApi#
     *
     * @description Builds and saves a new instance of this model
     *
     * @param  {object} _attr Data to be saved
     * @return {RecordApi} single record
     */
    $create: function(_attr) {
      return this.$build(_attr).$save();
    },

    /**
     * @memberof ScopeApi#
     *
     * @description Builds a new collection bound to this scope.
     *
     * If scope is another collection then it will inherit its parameters
     *
     * Collections are bound to an api resource.
     *
     * @param  {object} _params  Additional query string parameters
     * @param  {object} _scope  Scope override (optional)
     * @return {CollectionApi} Model Collection
     */
    $collection: function(_params, _scope) {
      return this.$$collection(_params, _scope);
    },

    /**
     * @memberof ScopeApi#
     *
     * @description Generates a new collection bound to this context and url and calls $fetch on it.
     *
     * @param {object} _params Collection parameters
     * @return {CollectionApi} record collection
     */
    $search: function(_params) {
      return this.$collection(_params).$fetch();
    }

  };

}]);